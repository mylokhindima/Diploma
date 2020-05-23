import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaInstructorRequestFormComponent } from './diploma-instructor-request-form.component';

describe('DiplomaInstructorRequestFormComponent', () => {
  let component: DiplomaInstructorRequestFormComponent;
  let fixture: ComponentFixture<DiplomaInstructorRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaInstructorRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaInstructorRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
