import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import {HttpModule} from '@angular/http';
import { TablesModule } from './tables/tables.module';
import { ChartsModule } from './charts/charts.module';
import { DashbordModule } from './dashbord/dashbord.module';

import { RegisterModule } from './register/register.module';
import { FormsModule } from './forms/forms.module';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    UserModule,
    TablesModule,
   ChartsModule,
   DashbordModule,
   FormsModule, 

    RegisterModule,
  
    HttpModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
