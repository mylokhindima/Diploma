import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DiplomaInstructorRequestService } from '../../../services/diploma-instructor-request.service';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { ProfileService } from './../../../services/profile.service';
import { DiplomaInstructorRequestsComponent } from './diploma-instructor-requests.component';


class DiplomaInstructorRequestServiceStub {
  public filterRequests(): Observable<DiplomaInstructorRequest[]> {
    return of([]);
  }
}
class ProfileServiceStub {
  user$ = new BehaviorSubject({ id: '1' });
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1' });
}


describe('DiplomaInstructorRequestsComponent', () => {
  let component: DiplomaInstructorRequestsComponent;
  let fixture: ComponentFixture<DiplomaInstructorRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DiplomaInstructorRequestService, useClass: DiplomaInstructorRequestServiceStub },
        { provide: ProfileService, useClass: ProfileServiceStub }
      ],
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
