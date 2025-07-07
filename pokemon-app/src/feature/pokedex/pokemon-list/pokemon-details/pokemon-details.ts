import {Component, OnDestroy, OnInit} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalFooterDirective, NzModalModule} from 'ng-zorro-antd/modal';
import {NzButtonComponent} from 'ng-zorro-antd/button';
import {PokemonService} from '../../../../data-access/services/pokemon-service';
import {ActivatedRoute} from '@angular/router';
import {Pokemon} from 'pokeapi-typescript';
import {Subscription} from 'rxjs';
import {PokemonDetail as PokemonDetailModel} from '../../../../data-access/model/pokemonDetail'
import {LoadingService} from '../../../../data-access/services/loading-service';
import {Spinner} from '../../../../shared/ui/spinner/spinner';

@Component({
  selector: 'app-pokemon-details',
  imports: [
    NzModalComponent,
    NzModalModule,
    NzModalContentDirective,
    Spinner
  ],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails implements OnInit, OnDestroy {
  pokemon?: PokemonDetailModel;
  pokemonName = '';
  pokemonDetailsSubscription!: Subscription;

  constructor(private activatedRoute: ActivatedRoute, private pokemonService: PokemonService, private loadingService: LoadingService) {
  }

  ngOnDestroy(): void {
  }

  ngOnInit(): void {
    this.pokemonName = this.activatedRoute.snapshot.paramMap.get('name')!;
    this.pokemonDetailsSubscription = this.pokemonService.getPokemon(this.pokemonName).subscribe((pokemon) => {
      this.pokemon = pokemon
    })
  }

  handleCancel() {

  }

  handleOk() {

  }
}
