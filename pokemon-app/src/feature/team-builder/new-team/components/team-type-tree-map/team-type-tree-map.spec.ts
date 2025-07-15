import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TeamTypeTreeMap } from './team-type-tree-map';

describe('TeamTypeTreeMap', () => {
  let component: TeamTypeTreeMap;
  let fixture: ComponentFixture<TeamTypeTreeMap>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TeamTypeTreeMap]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TeamTypeTreeMap);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
