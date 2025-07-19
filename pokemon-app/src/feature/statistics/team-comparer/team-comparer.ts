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
3
@Component({
  selector: 'app-team-comparer',
  templateUrl: './team-comparer.html',
  styleUrls: ['./team-comparer.css'],
})
export class TeamComparer implements AfterViewInit {
  private viewInitialized = false;
  private ref?: ComponentRef<any>;

  private _strategy = '';
  private _team1?: PokemonTeam;
  private _team2?: PokemonTeam;
  private _strategies: Record<string, Type<any>> = {};

  @ViewChild('container', { read: ViewContainerRef, static: true })
  container!: ViewContainerRef;

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

  @Input()
  set strategies(val: Record<string, Type<any>>) {
    this._strategies = val;
    this.renderIfReady();
  }
  get strategies(): Record<string, Type<any>> {
    return this._strategies;
  }

  ngAfterViewInit(): void {
    this.viewInitialized = true;
    this.renderIfReady();
  }

  private renderIfReady(): void {
    if (!this.viewInitialized || !this._strategy || !this._strategies) return;

    const strategyComponent = this._strategies[this._strategy];
    if (!strategyComponent) return;

    this.container.clear();
    this.ref = this.container.createComponent(strategyComponent);
    this.updateChildInputs();
  }

  private updateChildInputs(): void {
    if (!this.ref) return;

    if (this._team1 !== undefined) {
      this.ref.setInput?.('team1', this._team1);
    }

    if (this._team2 !== undefined) {
      this.ref.setInput?.('team2', this._team2);
    }
  }
}
