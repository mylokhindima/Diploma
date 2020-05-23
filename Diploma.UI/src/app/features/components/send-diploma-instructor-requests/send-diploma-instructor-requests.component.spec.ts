import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDiplomaInstructorRequestsComponent } from './send-diploma-instructor-requests.component';

describe('SendDiplomaInstructorRequestsComponent', () => {
  let component: SendDiplomaInstructorRequestsComponent;
  let fixture: ComponentFixture<SendDiplomaInstructorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDiplomaInstructorRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDiplomaInstructorRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
