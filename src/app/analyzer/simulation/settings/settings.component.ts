import {Component, Input, OnInit} from '@angular/core';
import {Simulation, SimulationsService} from '../../simulations.service';
import {FormBuilder, FormGroup} from '@angular/forms';
import {tap} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styles: []
})
export class SettingsComponent implements OnInit {
  @Input() simulation: Simulation;
  captureDistance = 0;
  form: FormGroup;
  saving = false;
  error: string = null;

  constructor(private fb: FormBuilder,
              private snackBar: MatSnackBar,
              private dao: SimulationsService) { }

  ngOnInit() {
    this.captureDistance =
      this.simulation.beta * this.simulation.pilot_settings.filter(ps => ps.action_type === 'Pursue')[0].turning_radius;
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      id: this.simulation.id,
      tags: this.simulation.tags
    });
  }

  updateTags() {
    this.saving = true;
    this.dao.updateTags(this.form.controls.id.value, this.form.controls.tags.value)
      .pipe(
        tap(_ => {
          this.saving = false;
          this.error = null;
          this.snackBar.open('Tags successfully updated', '', {
            duration: 2000
          });
        })
      )
      .subscribe(
        m => m,
        error => {
          this.error = error.error.msg;
          this.saving = false;
        }
      );
  }

}
