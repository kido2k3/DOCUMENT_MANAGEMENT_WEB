import { Component, ElementRef, Injector, OnInit, ViewChild, QueryList, AfterViewInit, ViewChildren } from '@angular/core';
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
import { toNumber } from 'lodash-es';

@Component({
  templateUrl: './luu-tru.component.html',
  animations: [appModuleAnimation()]
})

export class LuuTruComponent extends AppComponentBase{
  @ViewChild('dataTable', { static: true }) dataTable: Table;
  @ViewChild('paginator', { static: true }) paginator: Paginator;
  @ViewChild('allCheck', {static: false}) allCheck: ElementRef<HTMLInputElement>;
  @ViewChildren('checkbox') checkboxes: QueryList<ElementRef<HTMLInputElement>>;

  tenant_id: number[] = []
  isDisabled: boolean = true;

  constructor(
    injector: Injector,
    private _tenantService: TenantServiceProxy,
    private _dateTimeService: DateTimeService,
  ) {
    super(injector);
  }

  ngAfterViewInit() { }

  check(record: any): void{
    this.isDisabled = true;
    this.checkboxes.forEach((checkbox)=>{
      if(checkbox.nativeElement.checked == true) this.isDisabled = false;
    })

    if(record.isCheckboxChecked == true) {
      this.tenant_id.push(record.id);
    }
    else {
      this.allCheck.nativeElement.checked = false;
      // console.log(record.id)
      const index = this.tenant_id.indexOf(record.id);
      if (index > -1) {
        this.tenant_id.splice(index, 1);
      }
    }

    // console.log(this.tenant_id)
  }

  checkAll(): void{
    if(this.allCheck.nativeElement.checked == true){
      this.checkboxes.forEach((checkbox)=>{
        checkbox.nativeElement.checked = this.allCheck.nativeElement.checked;
        this.tenant_id.push(toNumber(checkbox.nativeElement.id))
      })
      this.tenant_id = Array.from(new Set(this.tenant_id))
    }
    else{
      this.checkboxes.forEach((checkbox)=>{
        checkbox.nativeElement.checked = this.allCheck.nativeElement.checked;
      })
      this.tenant_id = [];
    }

    this.isDisabled = !this.allCheck.nativeElement.checked;
    // console.log(this.tenant_id)
  }

  deleteTenant(): void {
    this.message.confirm(
        this.l('TenantDeleteWarningMessage'),
        this.l('AreYouSure'),
        (isConfirmed) => {
            if (isConfirmed) {
              this.tenant_id.forEach((tenant)=>{
                  this._tenantService.deleteTenant(tenant).subscribe(() => {
                    this.reloadPage();
                    this.notify.success(this.l('SuccessfullyDeleted'));
                  });
                })
            }
        }
    );
  }

  reloadPage(): void {
    this.paginator.changePage(this.paginator.getPage());
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