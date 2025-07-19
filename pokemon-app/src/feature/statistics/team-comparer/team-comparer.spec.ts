import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComparer } from './team-comparer';

describe('TeamComparer', () => {
  let component: TeamComparer;
  let fixture: ComponentFixture<TeamComparer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComparer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComparer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
