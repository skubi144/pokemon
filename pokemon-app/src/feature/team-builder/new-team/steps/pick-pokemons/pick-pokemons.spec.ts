import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPokemons } from './pick-pokemons';

describe('PickPokemons', () => {
  let component: PickPokemons;
  let fixture: ComponentFixture<PickPokemons>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickPokemons]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickPokemons);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
