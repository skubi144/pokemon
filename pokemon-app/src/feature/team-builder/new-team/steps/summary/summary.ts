import {Component, OnInit} from '@angular/core';
import {NzFlexDirective} from 'ng-zorro-antd/flex';
import {NzPageHeaderTitleDirective} from 'ng-zorro-antd/page-header';
import {PokemonList} from '../../../pokemon-list/pokemon-list';
import {TeamBuilderService} from '../../service/team-builder-service';
import {NewTeamFormGroup} from '../common/form';
import {BerryMatchChart} from '../../components/berry-match-chart/berry-match-chart';

@Component({
  selector: 'app-summary',
  imports: [
    NzFlexDirective,
    NzPageHeaderTitleDirective,
    PokemonList,
    BerryMatchChart
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
