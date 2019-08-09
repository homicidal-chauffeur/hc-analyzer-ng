import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { library } from '@fortawesome/fontawesome-svg-core';
import { far } from '@fortawesome/pro-regular-svg-icons';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AnalyzerModule} from './analyzer/analyzer.module';
import {NlFontawesomeModule} from '@nextlogic/fontawesome';

library.add(far);

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    NlFontawesomeModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    HttpClientModule,

    AnalyzerModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
