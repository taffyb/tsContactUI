import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DynamicFormPropertyComponent } from './dynamic-form-property.component';

describe('DynamicFormPropertyComponent', () => {
  let component: DynamicFormPropertyComponent;
  let fixture: ComponentFixture<DynamicFormPropertyComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DynamicFormPropertyComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DynamicFormPropertyComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
