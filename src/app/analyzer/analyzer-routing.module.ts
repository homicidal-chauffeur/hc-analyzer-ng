import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SimulationsComponent} from './simulations/simulations.component';
import {SimulationComponent} from './simulation/simulation.component';

const routes: Routes = [
  { path: 'simulations',
    children: [
      { path: 'list', component: SimulationsComponent },

      { path: ':id/edit', component: SimulationComponent },

    ]
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule { }
