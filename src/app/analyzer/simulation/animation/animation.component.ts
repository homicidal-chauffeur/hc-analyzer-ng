import {Component, Input, OnInit} from '@angular/core';
import {Move, Simulation, Vector3r} from '../../simulations.service';
import {FormBuilder, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styles: []
})
export class AnimationComponent implements OnInit {
  @Input() simulation: Simulation;
  form: FormGroup;
  steps = 0;
  currentStep = 0;
  time = 0;
  pilotTransformations = {};
  trajectories = {};
  paused = true;
  trajTransformation = '';
  scale = 20;

  svgHeight = 700;
  svgWidth = 1200;

  viewBox = `0 0 ${this.svgWidth} ${this.svgHeight}`;

  offset = 10;
  planeSize = 12;
  distance = -1;

  delay = 10;

  captureDistance = 1;

  lastMoves = {};

  constructor(private fb: FormBuilder) {
    this.buildForm();
  }

  ngOnInit() {
    this.steps = this.simulation.moves.length;
    this.simulation.pilot_settings.forEach(p => {
      this.pilotTransformations[p.name] = '';
      this.trajectories[p.name] = '';
    });

    this.calculateScaleAndCenter();

    this.captureDistance =
      this.simulation.beta * this.simulation.pilot_settings.filter(ps => ps.action_type === 'Pursue')[0].turning_radius;
  }

  start() {
    if (this.currentStep === this.steps) {
      this.resetSimulation();
    }

    this.paused = false;
    this.move();
  }

  move() {
    if (this.paused) {
      return;
    }
    const m = this.simulation.moves[this.currentStep];
    this.currentStep += 1;
    this.updateAnimation(m);

    if (this.currentStep >= this.steps) {
      this.paused = true;
    } else {
      setTimeout(() => this.move(), this.delay);
    }
  }

  moveUntil(step: number) {
    let range = 0;
    if (step > this.currentStep) {
      range = step - this.currentStep;
    } else {
      range = step;
      this.reset();
    }
    Array.from(Array(range).keys()).forEach(_ => {
      this.currentStep += 1;
      const m = this.simulation.moves[this.currentStep];
      this.updateAnimation(m);
    });

  }

  updateAnimation(m: Move) {
    const theta = m.my_theta * (180 / Math.PI);
    this.pilotTransformations[m.name] =
      `translate(${m.my_position.x * this.scale - this.planeSize} ${m.my_position.y * this.scale - this.planeSize})
       rotate(${theta}, 12, 12)`;
    this.trajectories[m.name] += ` ${m.my_position.x *  this.scale}, ${m.my_position.y *  this.scale} `;

    this.updateLastMove(m);
  }

  updateLastMove(m: Move) {
    this.lastMoves[m.name] = m;
    this.time = m.time;
    this.form.controls.slider.setValue(this.currentStep);

    this.updateDistance( );
  }

  updateDistance() {
    const moves = Object.keys(this.lastMoves).map(k => this.lastMoves[k]);
    if (moves.length > 1) {
      const xDiff = moves[0].my_position.x - moves[1].my_position.x;
      const yDiff = moves[0].my_position.y - moves[1].my_position.y;
      this.distance = Math.sqrt( xDiff * xDiff + yDiff * yDiff );
    } else {
      this.distance = -1;
    }
  }

  pause() {
    this.paused = true;
  }

  resetSimulation() {
    this.reset();
    this.form.controls.slider.setValue(0);
  }

  reset() {
    Object.keys(this.trajectories).forEach(key => this.trajectories[key] = '');
    Object.keys(this.pilotTransformations).forEach(key => this.pilotTransformations[key] = '');
    this.currentStep = 0;
  }

  calculateScaleAndCenter() {
    const [maxX, minX, maxY, minY] = this.boundingRectangle();

    const initWidth = maxX - minX;
    const initHeight = maxY - minY;

    const canvasHeight = this.svgHeight - 2 * this.offset;
    const canvasWidth = this.svgWidth - 2 * this.offset;

    this.scale = Math.min(canvasWidth / initWidth, canvasHeight / initHeight);

    // this.viewBox = `${minX - this.offset} ${minY - this.offset} ${this.svgWidth} ${this.svgHeight}`;

    this.trajTransformation = `translate(${-minX * this.scale + this.offset} ${-minY * this.scale + this.offset})`;
  }

  boundingRectangle(): number[] {
    const maxX = Math.max(...this.simulation.moves.map(m => m.my_position.x));
    const minX = Math.min(...this.simulation.moves.map(m => m.my_position.x));
    const maxY = Math.max(...this.simulation.moves.map(m => m.my_position.y));
    const minY = Math.min(...this.simulation.moves.map(m => m.my_position.y));

    return [maxX, minX, maxY, minY];
  }

  round(num: number): number {
    return Math.round(num * 1000) / 1000;
  }

  buildForm() {
    this.form = this.fb.group({
      slider: [0]
    });

    this.form.controls.slider.valueChanges
      .subscribe(v => {
        if (v !== this.currentStep) {
          this.moveUntil(v);
        }
      });
  }
}
