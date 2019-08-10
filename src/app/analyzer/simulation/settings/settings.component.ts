import {Component, Input, OnInit} from '@angular/core';
import {Simulation} from '../../simulations.service';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  @Input() simulation: Simulation;

  constructor() { }

  ngOnInit() {
  }

}
