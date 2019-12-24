//import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { DataBarModule } from 'projects/ic-databar-lib/src/lib/ic-data-bar.module';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { IcFieldsetModule } from 'projects/ic-fieldset-lib/src/lib/ic-fieldset.module';
import { TesteDatabarModule } from './components/teste-databar/teste-databar.module';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserAnimationsModule,
    TesteDatabarModule,
    IcFieldsetModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
