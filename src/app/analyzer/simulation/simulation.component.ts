import { Component, OnInit } from '@angular/core';
import {Simulation, SimulationsService} from '../simulations.service';
import {ActivatedRoute} from '@angular/router';
import {switchMap, tap} from 'rxjs/operators';

@Component({
  selector: 'app-simulation',
  templateUrl: './simulation.component.html',
  styles: []
})
export class SimulationComponent implements OnInit {
  simulation: Simulation;
  loading = true;
  error: string = null;

  constructor(private dao: SimulationsService,
              route: ActivatedRoute) {
      route.params.pipe(
        switchMap(p => this.dao.simulation(p.id)),
        tap(_ => this.loading = false)
      )
        .subscribe(s => this.simulation = s);
  }

  ngOnInit() {
  }

}
