import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonIcon } from './pokemon-icon';

describe('PokemonIcon', () => {
  let component: PokemonIcon;
  let fixture: ComponentFixture<PokemonIcon>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonIcon]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonIcon);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
