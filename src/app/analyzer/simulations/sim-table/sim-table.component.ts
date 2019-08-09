import { Component, OnInit } from '@angular/core';
import {NlBaseTableComponent} from '@nextlogic/ng-list-table';

@Component({
  selector: 'app-sim-table',
  templateUrl: './sim-table.component.html',
  styles: []
})
export class SimTableComponent extends NlBaseTableComponent implements OnInit {

  constructor() {
    super();
  }

  ngOnInit() {
  }

}
