import {NgModule} from '@angular/core';
import {AppSharedModule} from '@app/shared/app-shared.module';
import {LuuTruRoutingModule} from './luu-tru-routing.module';
import {LuuTruComponent} from './luu-tru.component';

@NgModule({
    declarations: [LuuTruComponent],
    imports: [AppSharedModule, LuuTruRoutingModule]
})
export class LuuTruModule {}