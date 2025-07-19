import {Component, Type} from '@angular/core';
import {TeamComparerStrategy} from '../team-comparer-strategy/team-comparer-strategy';
import {TeamComparer} from '../team-comparer/team-comparer';
import {BaseStatsComparer} from '../team-comparer-strategies/base-stats-comparer/base-stats-comparer';
import {TypeComparer} from '../team-comparer-strategies/type-comparer/type-comparer';

@Component({
  selector: 'app-statistics',
  imports: [
    TeamComparerStrategy,
    TeamComparer,
    TeamComparer
  ],
  templateUrl: './statistics.html',
  styleUrl: './statistics.css'
})
export class Statistics {
  strategy: string = 'stats';
  strategies: Record<string, Type<any>> = {
    stats: BaseStatsComparer,
    type: TypeComparer
  }
}
