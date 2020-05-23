import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaInstructorRequestsComponent } from './diploma-instructor-requests.component';

describe('DiplomaInstructorRequestsComponent', () => {
  let component: DiplomaInstructorRequestsComponent;
  let fixture: ComponentFixture<DiplomaInstructorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaInstructorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaInstructorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
