import {Component, Input, OnInit} from '@angular/core';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';
import {PokemonDetail} from '../../../../../data-access/model';
import {forkJoin} from 'rxjs';
import {Color, PieChartModule, ScaleType, TreeMapModule} from '@swimlane/ngx-charts';
import {PokemonIcon} from '../../../../../shared/ui/pokemon-icon/pokemon-icon';
import {NgForOf} from '@angular/common';
import {getPokemonTypeCounts} from '../../utils';

@Component({
  selector: 'app-team-type-tree-map',
  imports: [
    TreeMapModule,
    PieChartModule,
    PokemonIcon,
    NgForOf,
  ],
  templateUrl: './team-type-tree-map.html',
  styleUrls: ['./team-type-tree-map.css']
})
export class TeamTypeTreeMap implements OnInit {
  @Input({required: true}) selectedPokemonIds: string[] = [];
  activeEntries = new Set<string>();
  treeMapData: { name: string; value: number }[] = [];
  colorScheme: Color = {
    group: ScaleType.Linear,
    name: 'name',
    selectable: false,
    domain: []
  };

  typeColorMap: Record<string, string> = {
    bug: '#92BC2C',
    dark: '#595761',
    dragon: '#0C69C8',
    electric: '#F2D94E',
    fire: '#FBA54C',
    fairy: '#EE90E6',
    fighting: '#D3425F',
    flying: '#A1BBEC',
    ghost: '#5F6DBC',
    grass: '#5FBD58',
    ground: '#DA7C4D',
    ice: '#75D0C1',
    normal: '#A0A29F',
    poison: '#B763CF',
    psychic: '#FA8581',
    rock: '#C9BB8A',
    steel: '#5695A3',
    water: '#539DDF'
  };

  constructor(private pokemonService: PokemonService) {
  }

  onLegendHover(entry: string): void {
    this.activeEntries.add(entry);
  }

  onLegendLeave(entry: string): void {
    this.activeEntries.delete(entry);
  }

  activeEntriesArray() {
    return this.treeMapData.filter(e => this.activeEntries.has(e.name));
  }

  ngOnInit(): void {
    if (!this.selectedPokemonIds?.length) {
      this.treeMapData = [];
      return;
    }

    const requests = this.selectedPokemonIds.map(id =>
      this.pokemonService.getPokemon(id)
    );

    forkJoin(requests).subscribe((pokemons: PokemonDetail[]) => {
      this.treeMapData = getPokemonTypeCounts(pokemons);

      this.colorScheme = {
        ...this.colorScheme,
        domain: this.treeMapData.map(entry => this.typeColorMap[entry.name] ?? '#ccc')
      };
    });
  }
}
