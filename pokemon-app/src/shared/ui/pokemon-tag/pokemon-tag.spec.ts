import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PokemonTag } from './pokemon-tag';

describe('PokemonTag', () => {
  let component: PokemonTag;
  let fixture: ComponentFixture<PokemonTag>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PokemonTag]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PokemonTag);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
