import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ChartListComponent } from './chart-list/chart-list.component';

const routes: Routes = [
  {path: 'charts', component: ChartListComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ChartsRoutingModule { }
