import { Component, OnInit } from '@angular/core';
import {NlBaseListComponent} from '@nextlogic/ng-list-table';
import {SimulationFilter, SimulationPreviewRows, SimulationsService} from '../simulations.service';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-simulations',
  templateUrl: './simulations.component.html'
})
export class SimulationsComponent extends NlBaseListComponent implements OnInit {

  constructor(private dao: SimulationsService) {
    super();
  }

  ngOnInit() {
  }

  getItems(filterValue: SimulationFilter, page: number): Observable<SimulationPreviewRows> {
    return this.dao.simulations(filterValue, page);
  }
}
