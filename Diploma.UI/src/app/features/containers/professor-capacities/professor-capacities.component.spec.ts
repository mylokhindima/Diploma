import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorCapacitiesComponent } from './professor-capacities.component';

describe('ProfessorCapacitiesComponent', () => {
  let component: ProfessorCapacitiesComponent;
  let fixture: ComponentFixture<ProfessorCapacitiesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorCapacitiesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorCapacitiesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
