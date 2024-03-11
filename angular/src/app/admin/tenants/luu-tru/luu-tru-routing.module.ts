import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LuuTruComponent} from './luu-tru.component';

const routes: Routes = [{
    path: '',
    component: LuuTruComponent,
    pathMatch: 'full'
}];

@NgModule({
    imports: [RouterModule.forChild(routes)],
    exports: [RouterModule],
})
export class LuuTruRoutingModule {}