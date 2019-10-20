import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDefFormComponent } from './entity-def-form.component';

describe('EntityDefFormComponent', () => {
  let component: EntityDefFormComponent;
  let fixture: ComponentFixture<EntityDefFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDefFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDefFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
