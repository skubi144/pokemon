import {Component,} from '@angular/core';
import {NzSpinComponent} from 'ng-zorro-antd/spin';

@Component({
  selector: 'app-spinner',
  imports: [
    NzSpinComponent
  ],
  templateUrl: './spinner.html',
  styleUrl: './spinner.css'
})
export class Spinner {
  constructor() {
  }
}
