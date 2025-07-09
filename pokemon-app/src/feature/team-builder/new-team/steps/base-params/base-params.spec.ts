import { ComponentFixture, TestBed } from '@angular/core/testing';

import { BaseParams } from './base-params';

describe('BaseParams', () => {
  let component: BaseParams;
  let fixture: ComponentFixture<BaseParams>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [BaseParams]
    })
    .compileComponents();

    fixture = TestBed.createComponent(BaseParams);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
