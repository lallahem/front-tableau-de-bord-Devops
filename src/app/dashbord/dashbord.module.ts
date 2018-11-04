import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { DashbordRoutingModule } from './dashbord-routing.module';
import { DashbordComponent } from './dashbord/dashbord.component';
import { HttpClientModule } from '@angular/common/http';
import {ChartsModule}from 'ng4-charts/ng4-charts';


@NgModule({
  imports: [
    CommonModule,
    DashbordRoutingModule,
    HttpClientModule,
    ChartsModule,
  ],
  declarations: [DashbordComponent]
})
export class DashbordModule { }
