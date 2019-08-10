import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-top-menu',
  templateUrl: './top-menu.component.html',
  styles: []
})
export class TopMenuComponent implements OnInit {
  navbarOpen = false;

  constructor() { }

  ngOnInit() {
  }

}
