import { Component, Injector, ViewChild } from '@angular/core';
import { AppComponentBase } from '@shared/common/app-component-base';
import { appModuleAnimation } from '@shared/animations/routerTransition';
import { Table } from 'primeng/table';
import { LazyLoadEvent } from 'primeng/api';
import { Paginator } from 'primeng/paginator';
import {
  CommonLookupServiceProxy,
  EntityDtoOfInt64,
  FindUsersInput,
  NameValueDto,
  TenantListDto,
  TenantServiceProxy,
} from '@shared/service-proxies/service-proxies';
import { DateTime } from 'luxon';
import { DateTimeService } from '@app/shared/common/timing/date-time.service';
import { finalize } from 'rxjs/operators';
@Component({
  templateUrl: './luu-tru.component.html',
  animations: [appModuleAnimation()]
})

export class LuuTruComponent extends AppComponentBase {
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  constructor(
    injector: Injector,
    private _tenantService: TenantServiceProxy,
    private _dateTimeService: DateTimeService
  ) {
    super(injector);
  }
  filters: {
    filterText: string;
    creationDateRangeActive: boolean;
    subscriptionEndDateRangeActive: boolean;
    selectedEditionId: number;
  } = <any>{};
  subscriptionDateRange: DateTime[] = [
    this._dateTimeService.getStartOfDay(),
    this._dateTimeService.getEndOfDayPlusDays(30),
  ];
  creationDateRange: DateTime[] = [this._dateTimeService.getStartOfDay(), this._dateTimeService.getEndOfDay()];
  getTenants(event?: LazyLoadEvent) {
    if (this.primengTableHelper.shouldResetPaging(event)) {
      this.paginator.changePage(0);
      return;
    }

    this.primengTableHelper.showLoadingIndicator();

    this._tenantService
      .getTenants(
        this.filters.filterText,
        this.filters.subscriptionEndDateRangeActive ? this.subscriptionDateRange[0] : undefined,
        this.filters.subscriptionEndDateRangeActive ? this.subscriptionDateRange[1].endOf('day') : undefined,
        this.filters.creationDateRangeActive ? this.creationDateRange[0] : undefined,
        this.filters.creationDateRangeActive ? this.creationDateRange[1].endOf('day') : undefined,
        this.filters.selectedEditionId,
        this.filters.selectedEditionId !== undefined && this.filters.selectedEditionId + '' !== '-1',
        this.primengTableHelper.getSorting(this.dataTable),
        this.primengTableHelper.getMaxResultCount(this.paginator, event),
        this.primengTableHelper.getSkipCount(this.paginator, event)
      )
      .pipe(finalize(() => this.primengTableHelper.hideLoadingIndicator()))
      .subscribe((result) => {
        this.primengTableHelper.totalRecordsCount = result.totalCount;
        this.primengTableHelper.records = result.items;
        this.primengTableHelper.hideLoadingIndicator();
      });
  }
}