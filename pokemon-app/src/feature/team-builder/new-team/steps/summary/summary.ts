import {Component, OnInit} from '@angular/core';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzPageHeaderComponent, NzPageHeaderTitleDirective} from 'ng-zorro-antd/page-header';
import {PokemonList} from '../../../pokemon-list/pokemon-list';
import {TeamBuilderService} from '../../service/team-builder-service';
import {NewTeamFormGroup} from '../common/form';
import {BerryMatchChart} from '../../components/berry-match-chart/berry-match-chart';
import {TeamTypeTreeMap} from '../../components/team-type-tree-map/team-type-tree-map';
import {NzColDirective, NzRowDirective} from 'ng-zorro-antd/grid';
import {NzCardComponent} from 'ng-zorro-antd/card';
import {NzCollapseComponent, NzCollapsePanelComponent} from 'ng-zorro-antd/collapse';

@Component({
  selector: 'app-summary',
  imports: [
    NzFlexDirective,
    NzPageHeaderTitleDirective,
    PokemonList,
    BerryMatchChart,
    TeamTypeTreeMap,
    NzRowDirective,
    NzColDirective,
    NzPageHeaderComponent,
    NzCardComponent,
    NzCollapseComponent,
    NzCollapsePanelComponent
  ],
  templateUrl: './summary.html',
  styleUrl: './summary.css'
})
export class Summary implements OnInit {

  formGroup!: NewTeamFormGroup;

  constructor(private teamBuildingService: TeamBuilderService) {
  }

  ngOnInit() {
    this.formGroup = this.teamBuildingService.formGroup;
  }

  getPokemons(): string[] {
    return this.formGroup.get('pokemons')?.get('selectedId')?.value ?? []
  }

  getTeamName(): string {
    return this.formGroup.get('base')?.get('name')?.value ?? ''
  }

  getBerryNames(): string[] {
    return this.formGroup.get('berries')?.get('selectedId')?.value ?? []
  }
}
