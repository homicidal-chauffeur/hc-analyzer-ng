import {Component, Input, OnInit} from '@angular/core';
import {Move, Simulation} from '../../simulations.service';

@Component({
  selector: 'app-animation',
  templateUrl: './animation.component.html',
  styles: []
})
export class AnimationComponent implements OnInit {
  @Input() simulation: Simulation;
  steps = 0;
  currentStep = 0;
  time = 0;
  pilotTransformations = {};
  trajectories = {};
  paused = true;
  trajTransformation = '';
  initScale = 20;

  svgHeight = 700;
  svgWidth = 1200;
  offset = 10;
  planeSize = 12;
  distance = -1;

  captureDistance = 1;

  lastMoves = {};

  constructor() {
  }

  ngOnInit() {
    this.steps = this.simulation.moves.length;
    this.simulation.pilot_settings.forEach(p => {
      this.pilotTransformations[p.name] = '';
      this.trajectories[p.name] = '';
    });

    this.trajTransformation = this.calculateTransformation();

    this.captureDistance =
      this.simulation.beta * this.simulation.pilot_settings.filter(ps => ps.action_type === 'Pursue')[0].turning_radius;
  }

  start() {
    if (this.currentStep === 0) {
      this.reset();
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
    const theta = m.my_theta * (180 / Math.PI);
    this.pilotTransformations[m.name] =
      `translate(${m.my_position.x * this.initScale}, ${m.my_position.y * this.initScale}), rotate(${theta}, 12, 12)`;
    this.trajectories[m.name] += ` ${m.my_position.x *  this.initScale}, ${m.my_position.y *  this.initScale} `;

    this.updateLastMove(m);

    if (this.currentStep >= this.steps) {
      this.paused = true;
      this.currentStep = 0;
    } else {
      setTimeout(() => this.move(), 10);
    }
  }

  updateLastMove(m: Move) {
    this.lastMoves[m.name] = m;
    this.time = m.time;

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

  reset() {
    Object.keys(this.trajectories).forEach(key => this.trajectories[key] = '');
    Object.keys(this.pilotTransformations).forEach(key => this.pilotTransformations[key] = '');
    this.currentStep = 0;
  }

  calculateTransformation(): string {
    const maxX = Math.max(...this.simulation.moves.map(m => m.my_position.x)) *  this.initScale;
    const minX = Math.min(...this.simulation.moves.map(m => m.my_position.x)) *  this.initScale;
    const maxY = Math.max(...this.simulation.moves.map(m => m.my_position.y)) *  this.initScale;
    const minY = Math.min(...this.simulation.moves.map(m => m.my_position.y)) *  this.initScale;

    const width = maxX - minX;
    const height = maxY - minY;

    const canvasHeight = this.svgHeight - 2 * this.offset;
    const canvasWidth = this.svgWidth - 2 * this.offset;
    const scaleH = (height > canvasHeight) ? canvasHeight / height : 1;
    const scaleW = (width > canvasWidth) ? canvasWidth / width : 1;

    const scale = (scaleH < 1 || scaleW < 1)  ? Math.min(scaleH, scaleW) : 1;

    return `translate(${-minX * scale + this.offset} ${-minY * scale + this.offset}) scale(${scale} ${scale}) `;
  }

  round(num: number): number {
    return Math.round(num * 1000) / 1000;
  }
}
