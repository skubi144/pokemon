import {Component} from '@angular/core';
import {TeamComparerStrategy} from '../team-comparer-strategy/team-comparer-strategy';
import {TeamComparer} from '../team-comparer/team-comparer';

@Component({
  selector: 'app-statistics',
  imports: [
    TeamComparerStrategy,
    TeamComparer
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics {
  strategy: string = 'stats';
}
