import {
  AfterViewInit,
  Component,
  ComponentRef,
  Input,
  Type,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { PokemonTeam } from '../../../data-access/model';
import { BaseStatsComparer } from '../team-comparer-strategies/base-stats-comparer/base-stats-comparer';

@Component({
  selector: 'app-team-comparer',
  templateUrl: './team-comparer.html',
  styleUrls: ['./team-comparer.css'],
})
export class TeamComparer implements AfterViewInit {
  private _strategy = '';
  private _team1?: PokemonTeam;
  private _team2?: PokemonTeam;
  private ref?: ComponentRef<any>;
  private strategies: Record<string, Type<any>> = {
    stats: BaseStatsComparer,
  };
  private viewInitialized = false;


  @Input()
  set strategy(val: string) {
    this._strategy = val;
    this.renderIfReady();
  }
  get strategy(): string {
    return this._strategy;
  }

  @Input()
  set team1(val: PokemonTeam | undefined) {
    this._team1 = val;
    this.updateChildInputs();
  }
  get team1(): PokemonTeam | undefined {
    return this._team1;
  }

  @Input()
  set team2(val: PokemonTeam | undefined) {
    this._team2 = val;
    this.updateChildInputs();
  }
  get team2(): PokemonTeam | undefined {
    return this._team2;
  }

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderIfReady();
  }

  private renderIfReady() {
    if (!this.viewInitialized || !this._strategy) return;

    this.container.clear();
    const strategyComponent = this.strategies[this._strategy];
    if (!strategyComponent) return;

    this.ref = this.container.createComponent(strategyComponent);
    this.updateChildInputs();
  }

  private updateChildInputs() {
    if (!this.ref) return;

    if (this._team1 !== undefined) this.ref.setInput('team1', this._team1);
    if (this._team2 !== undefined) this.ref.setInput('team2', this._team2);
  }
}
