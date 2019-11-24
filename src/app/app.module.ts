//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataBarModule } from 'projects/ic-databar-lib/src/lib/ic-data-bar.module';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    DataBarModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
