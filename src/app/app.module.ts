import { SharedModule } from './shared/shared.module';
import { PrivateModule } from './private/private.module';
import { PublicModule } from './public/public.module';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {HttpClientModule, HTTP_INTERCEPTORS} from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
// import { TokenInterceptorService } from './services/token-interceptor.service';

//material module
import { MaterialModule } from './material/material.module';
import { SidebarComponent } from './private/Components/sidebar/sidebar.component';

@NgModule({
  declarations: [
    AppComponent,
  ],
  imports: [
    BrowserModule,
    PublicModule,
    PrivateModule,
    SharedModule,
    ReactiveFormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MaterialModule
  ],
  providers: [
    SidebarComponent
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
