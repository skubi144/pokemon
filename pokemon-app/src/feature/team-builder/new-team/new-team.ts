import {Component} from '@angular/core';
import {RouterOutlet} from '@angular/router';

@Component({
  template: `
    <router-outlet></router-outlet>`,
  imports: [
    RouterOutlet
  ]
})
export class NewTeam {}
