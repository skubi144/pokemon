import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TypeComparer } from './type-comparer';

describe('TypeComparer', () => {
  let component: TypeComparer;
  let fixture: ComponentFixture<TypeComparer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [TypeComparer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TypeComparer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
