import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseStatsComparer } from './base-stats-comparer';

describe('BaseStatsComparer', () => {
  let component: BaseStatsComparer;
  let fixture: ComponentFixture<BaseStatsComparer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseStatsComparer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseStatsComparer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
