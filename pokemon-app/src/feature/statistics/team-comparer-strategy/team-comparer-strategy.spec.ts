import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamComparerStrategy } from './team-comparer-strategy';

describe('TeamComparerStrategy', () => {
  let component: TeamComparerStrategy;
  let fixture: ComponentFixture<TeamComparerStrategy>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamComparerStrategy]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamComparerStrategy);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
