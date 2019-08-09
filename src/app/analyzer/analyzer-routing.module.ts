import {RouterModule, Routes} from '@angular/router';
import {NgModule} from '@angular/core';
import {SimulationsComponent} from './simulations/simulations.component';

const routes: Routes = [
  { path: 'simulations',
    children: [
      { path: 'list', component: SimulationsComponent },

      // { path: ':id/edit', component: BallotFormComponent },

    ]
  },


];


@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AnalyzerRoutingModule { }
