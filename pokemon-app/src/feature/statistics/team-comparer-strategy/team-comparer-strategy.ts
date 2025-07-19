import { Component, EventEmitter, Input, Output } from '@angular/core';
import {NgClass, NgFor, TitleCasePipe} from '@angular/common';

@Component({
  selector: 'app-team-comparer-strategy',
  standalone: true,
  imports: [NgClass, NgFor, TitleCasePipe],
  templateUrl: './team-comparer-strategy.html',
  styleUrls: ['./team-comparer-strategy.css']
})
export class TeamComparerStrategy {
  @Input({ required: true }) strategy!: string;
  @Output() strategyChange = new EventEmitter<string>();

  strategies = ['stats', 'type'];

  selectStrategy(s: string) {
    if (this.strategy !== s) {
      this.strategy = s;
      this.strategyChange.emit(s);
    }
  }
}
