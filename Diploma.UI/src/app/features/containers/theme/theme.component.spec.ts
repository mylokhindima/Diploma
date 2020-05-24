import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DiplomaInstructorThemeRequestService } from './../../../services/diploma-instructor-theme-request.service';
import { ProfileService } from './../../../services/profile.service';
import { ThemeComponent } from './theme.component';



class ProfileServiceStub {
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1' });
}
class DiplomaInstructorThemeRequestServiceStub {
  public filterRequests(): Observable<DiplomaInstructorRequest[]> {
    return of([]);
  }
}

describe('ThemeComponent', () => {
  let component: ThemeComponent;
  let fixture: ComponentFixture<ThemeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProfileService, useClass: ProfileServiceStub },
        { provide: DiplomaInstructorThemeRequestService, useClass: DiplomaInstructorThemeRequestServiceStub }
      ],
      declarations: [ ThemeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ThemeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
