import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SendDiplomaInstructorThemeRequestsComponent } from './send-diploma-instructor-theme-requests.component';

describe('SendDiplomaInstructorThemeRequestsComponent', () => {
  let component: SendDiplomaInstructorThemeRequestsComponent;
  let fixture: ComponentFixture<SendDiplomaInstructorThemeRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SendDiplomaInstructorThemeRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SendDiplomaInstructorThemeRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
