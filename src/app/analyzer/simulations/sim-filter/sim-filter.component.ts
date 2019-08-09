import { Component, OnInit } from '@angular/core';
import {NlBaseFilterComponent} from '@nextlogic/ng-list-table';
import {FormBuilder} from '@angular/forms';
import {SimulationsService} from '../../simulations.service';
import {DateAdapter} from '@angular/material';

@Component({
  selector: 'app-sim-filter',
  templateUrl: './sim-filter.component.html',
  styles: []
})
export class SimFilterComponent extends NlBaseFilterComponent implements OnInit {

  constructor(private fb: FormBuilder,
              private dao: SimulationsService,
              private adapter: DateAdapter<any>) {
    super();
    adapter.setLocale('au');

    this.setupForm();
  }

  ngOnInit() {
  }

  setupForm() {
    this.form = this.fb.group({
      tags: [null],
      dateFrom: [null],
      dateTo: [null]
    });
  }
}
