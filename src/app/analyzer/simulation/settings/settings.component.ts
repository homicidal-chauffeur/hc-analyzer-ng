import {Component, Input, OnInit} from '@angular/core';
import {Simulation} from '../../simulations.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  @Input() simulation: Simulation;
  captureDistance = 0;

  constructor() { }

  ngOnInit() {
    this.captureDistance =
      this.simulation.beta * this.simulation.pilot_settings.filter(ps => ps.action_type === 'Pursue')[0].turning_radius;
  }

}
