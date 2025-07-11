import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PickPotions } from './pick-potions';

describe('Potions', () => {
  let component: PickPotions;
  let fixture: ComponentFixture<PickPotions>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [PickPotions]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PickPotions);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
