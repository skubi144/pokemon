import {Component, OnInit} from '@angular/core';
import {PokemonService} from '../../../../../data-access/services/pokemon-service';

@Component({
  selector: 'app-potions',
  imports: [],
  templateUrl: './potions.html',
  styleUrl: './potions.css'
})
export class Potions implements OnInit {
  constructor(private pokemonService: PokemonService) {
  }

  ngOnInit(): void {
    this.pokemonService.getBerriesAll().subscribe(console.log)
    this.pokemonService.getPotionsAll().subscribe(console.log)
  }
}
