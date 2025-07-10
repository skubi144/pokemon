import {Component, DestroyRef, EventEmitter, Input, OnInit, Output} from '@angular/core';
import {NzModalComponent, NzModalContentDirective, NzModalModule} from 'ng-zorro-antd/modal';
import {PokemonService} from '../../../../data-access/services/pokemon-service';
import {Subscription} from 'rxjs';
import {PokemonDetail as PokemonDetailModel} from '../../../../data-access/model/pokemonDetail'
import {LoadingService} from '../../../../data-access/services/loading-service';
import {Spinner} from '../../../../shared/ui/spinner/spinner';
import {NgIf} from '@angular/common';
import {PokemonCard} from '../../../../shared/ui/pokemon-card/pokemon-card';
import {takeUntilDestroyed} from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-pokemon-details',
  imports: [
    NzModalComponent,
    NzModalModule,
    NzModalContentDirective,
    Spinner,
    NgIf,
    PokemonCard
  ],
  templateUrl: './pokemon-details.html',
  styleUrl: './pokemon-details.css'
})
export class PokemonDetails implements OnInit {
  @Input() pokemonName?: string;
  @Output() close = new EventEmitter<void>();
  pokemon?: PokemonDetailModel;

  constructor(private destroyRef: DestroyRef, private pokemonService: PokemonService, protected loadingService: LoadingService) {
  }

  ngOnInit(): void {
    if (!this.pokemonName) {
      this.close.emit();
    }

    this.pokemonService
      .getPokemon(this.pokemonName!)
      .pipe(takeUntilDestroyed(this.destroyRef))
      .subscribe(
        (pokemon) => {
          this.pokemon = pokemon
        })
  }

  async handleCancel() {
    this.close.emit();
  }
}
