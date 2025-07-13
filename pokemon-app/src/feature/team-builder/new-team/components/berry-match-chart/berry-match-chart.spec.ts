import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BerryMatchChart } from './berry-match-chart';

describe('BerryMatchChart', () => {
  let component: BerryMatchChart;
  let fixture: ComponentFixture<BerryMatchChart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BerryMatchChart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BerryMatchChart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
