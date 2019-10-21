import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntityDefListComponent } from './entity-def-list.component';

describe('EntityDefListComponent', () => {
  let component: EntityDefListComponent;
  let fixture: ComponentFixture<EntityDefListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntityDefListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntityDefListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
