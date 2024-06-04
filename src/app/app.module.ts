
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ReactiveFormsModule } from '@angular/forms';
import { DashboardComponent } from './dashboard/dashboard.component';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './dashboard/header/header.component';
import { EditEmployeeComponent } from './dashboard/edit-employee/edit-employee.component';
import { DetEmployeeComponent } from './dashboard/det-employee/det-employee.component';
import { ViewComponent } from './dashboard/view/view.component';
import { SharedService } from './shared.service';




@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DashboardComponent,
    HeaderComponent,
    EditEmployeeComponent,
    DetEmployeeComponent,
    ViewComponent,
  
    
   ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
  
    
  ],

  providers:  [SharedService],
  bootstrap: [AppComponent]
  
})
export class AppModule { }

