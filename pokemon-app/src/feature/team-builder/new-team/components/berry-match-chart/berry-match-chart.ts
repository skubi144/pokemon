import {Component, Input, OnInit} from '@angular/core';
import {BerryDetail, PokemonDetail} from '../../../../../data-access/model';
import {forkJoin} from 'rxjs';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';
import {NgIf} from '@angular/common';
import {Color, LineChartModule, ScaleType} from '@swimlane/ngx-charts';

@Component({
  selector: 'app-berry-match-chart',
  imports: [
    NgIf,
    LineChartModule
  ],
  templateUrl: './berry-match-chart.html',
  styleUrl: './berry-match-chart.css'
})
export class BerryMatchChart implements OnInit {
  @Input({required: true}) selectedPokemonIds: string[] = [];
  @Input({required: true}) selectedBerryNames: string[] = [];

  chartData: any[] = [];
  loading = true;
  colorScheme: Color = {
    name: 'name',
    selectable: false,
    group: ScaleType.Linear,
    domain: ['#5AA454', '#A10A28', '#C7B42C', '#AAAAAA']
  };
  private natureFlavorMap: Record<string, string> = {
    adamant: 'spicy',
    bashful: '',
    bold: 'sour',
    brave: 'spicy',
    calm: 'bitter',
    careful: 'bitter',
    docile: '',
    gentle: 'bitter',
    hardy: '',
    hasty: 'dry',
    impish: 'sour',
    jolly: 'sweet',
    lax: 'sour',
    lonely: 'spicy',
    mild: 'dry',
    modest: 'dry',
    naive: 'sweet',
    naughty: 'spicy',
    quiet: 'dry',
    quirky: '',
    rash: 'dry',
    relaxed: 'sour',
    sassy: 'bitter',
    serious: '',
    timid: 'sweet'
  };

  private natureNames = Object.keys(this.natureFlavorMap).filter(n => this.natureFlavorMap[n] !== '');

  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    if (!this.selectedPokemonIds.length || !this.selectedBerryNames.length) return;

    this.loading = true;

    const pokemon$ = forkJoin(
      this.selectedPokemonIds.map(id => this.pokemonService.getPokemon(id))
    );

    const berries$ = forkJoin(
      this.selectedBerryNames.map(name => this.pokemonService.getBerry(name))
    );

    forkJoin([pokemon$, berries$]).subscribe(([pokemons, berries]) => {
      this.chartData = this.transformData(pokemons, berries);
      this.loading = false;
    });
  }

  private getRandomNature(): string {
    const randomIndex = Math.floor(Math.random() * this.natureNames.length);
    return this.natureNames[randomIndex];
  }

  private transformData(pokemons: PokemonDetail[], berries: BerryDetail[]): any[] {
    return pokemons.map(pokemon => {
      const nature = this.getRandomNature();
      const preferredFlavor = this.natureFlavorMap[nature] ?? '';

      const series = berries.map(berry => {
        const match = berry.flavors.find(f =>
          f.flavor.name === preferredFlavor
        );
        return {
          name: berry.name,
          value: match?.potency || 0
        };
      });

      return {
        name: pokemon.name,
        nature,
        series
      };
    });
  }
}
