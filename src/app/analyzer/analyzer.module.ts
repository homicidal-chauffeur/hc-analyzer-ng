import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SimulationsComponent } from './simulations/simulations.component';
import { SimFilterComponent } from './simulations/sim-filter/sim-filter.component';
import { SimTableComponent } from './simulations/sim-table/sim-table.component';
import {MaterialModule} from '../material/material.module';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {InfiniteScrollModule} from 'ngx-infinite-scroll';
import {AnalyzerRoutingModule} from './analyzer-routing.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
  declarations: [SimulationsComponent, SimFilterComponent, SimTableComponent],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MaterialModule,
    FontAwesomeModule,
    InfiniteScrollModule,

    AnalyzerRoutingModule
  ]
})
export class AnalyzerModule { }
