import { MaterialModule } from './../material/material.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { PublicRoutingModule } from './public-routing.module';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { HomeComponent } from './Pages/home/home.component';
import { LoginComponent } from './Pages/login/login.component';
import { NavbarComponent } from './Components/navbar/navbar.component';
import { ButtonComponent } from './Components/button/button.component';
import { RegisterComponent } from './Pages/register/register.component';


@NgModule({
  declarations: [
    HomeComponent,
    LoginComponent,
    NavbarComponent,
    ButtonComponent,
    RegisterComponent
  ],
  imports: [
    CommonModule,
    PublicRoutingModule,
    MaterialModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule
  ],
  exports: [
    FormsModule,
    ReactiveFormsModule
  ]
})
export class PublicModule { }
