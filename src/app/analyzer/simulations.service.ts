import { Injectable } from '@angular/core';
import * as _moment from 'moment';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SimulationsService {

  constructor(private http: HttpClient) { }

  simulations(filter: SimulationFilter, page: number): Observable<SimulationPreviewRows> {
    return this.http.post<SimulationPreviewRows>(
      `${environment.baseUrl}simulations/search?page=${page}`, filter
    );
  }

  simulation(id: number): Observable<Simulation> {
    return this.http.get<Simulation>(
      `${environment.baseUrl}simulations/${id}`
    );
  }
}

export interface SimulationFilter {
  dateFrom: _moment.Moment;
  dateTo: _moment.Moment;
  tags: string;
}

export interface PilotSettings {
  name: string;
  action_type: string;
  pilot_strategy: string;
  velocity_type: string;
  turning_radius: number;
  pilot_delay: number;
}

export interface Capture {
  time: number;
  distance: number;
}

export interface Vector3r {
  x: number;
  y: number;
  z: number;
}

export interface Quaternion3r {
  x: number;
  y: number;
  z: number;
  w: number;
}

export interface Move {
  name: string;
  time: number;
  my_theta: number;
  opp_theta: number;
  my_position: Vector3r;
  opp_position: Vector3r;
  my_orientation: Quaternion3r;
  opp_orientation: Quaternion3r;
}

export interface Simulation {
  id: number;
  date_at: Date;
  tags: string;
  gamma: number;
  beta: number;
  max_velocity_pursuer: number;
  location_update_delay: number;
  game_time: number;
  captures_count: number;
  first_capture: number;

  pilot_settings: PilotSettings[];
  captures: Capture[];
  moves: Move[];
}

export interface SimulationPreview {
  id: number;
  date_at: Date;
  tags: string;
  gamma: number;
  beta: number;
  max_velocity_pursuer: number;
  location_update_delay: number;
  game_time: number;
  captures_count: number;
  first_capture: number;

  pilot_settings: PilotSettings[];
}

export interface SimulationPreviewRows {
  rows: SimulationPreview[];
  next: boolean;
  total: number;
}
