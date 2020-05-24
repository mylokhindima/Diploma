import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { Observable, of } from 'rxjs';
import { DiplomaInstructorThemeRequest } from '../../../models/diploma-instructor-theme-request';
import { DiplomaInstructorThemeRequestService } from './../../../services/diploma-instructor-theme-request.service';
import { MethodologicalCommiteeApproveRequestsComponent } from './methodological-commitee-approve-requests.component';



class DiplomaInstructorThemeRequestServiceStub {
  public filterRequests(): Observable<DiplomaInstructorThemeRequest[]> {
    return of([]);
  }
}

describe('MethodologicalCommiteeApproveRequestsComponent', () => {
  let component: MethodologicalCommiteeApproveRequestsComponent;
  let fixture: ComponentFixture<MethodologicalCommiteeApproveRequestsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DiplomaInstructorThemeRequestService, useClass: DiplomaInstructorThemeRequestServiceStub },
      ],
      declarations: [ MethodologicalCommiteeApproveRequestsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodologicalCommiteeApproveRequestsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
