import { Component } from '@angular/core';
import {FaIconService} from '@fortawesome/angular-fontawesome';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  constructor(faIconService: FaIconService) {
    faIconService.defaultPrefix = 'far';
  }
}
