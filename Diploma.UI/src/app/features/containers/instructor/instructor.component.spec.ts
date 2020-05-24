import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { DiplomaInstructorRequestService } from '../../../services/diploma-instructor-request.service';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { ProfessorsService } from './../../../services/professors.service';
import { ProfileService } from './../../../services/profile.service';
import { InstructorComponent } from './instructor.component';
import { Professor } from '../../../models/proffesor';


class ProfessorsServiceStub {
  public filterByQuery(): Observable<Professor[]> {
    return of([{ id: '1' }]) as Observable<Professor[]>;
  }
}
class DiplomaInstructorRequestServiceStub {
  public filterRequests(): Observable<DiplomaInstructorRequest[]> {
    return of([{ id: '1' }, { id: '2' }]) as Observable<DiplomaInstructorRequest[]>;
  }
}
class ProfileServiceStub {
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1', departmentId: '2' });
}

describe('InstructorComponent', () => {
  let component: InstructorComponent;
  let fixture: ComponentFixture<InstructorComponent>;


  let diplomaInstructorRequestService: DiplomaInstructorRequestService;
  let professorsService: ProfessorsService;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InstructorComponent ],
      providers: [
        {
          provide: ProfessorsService,
          useClass: ProfessorsServiceStub,
        },
        {
          provide: DiplomaInstructorRequestService,
          useClass: DiplomaInstructorRequestServiceStub,
        },
        {
          provide: ProfileService,
          useClass: ProfileServiceStub,
        }
      ]
    })
    .compileComponents();

    diplomaInstructorRequestService = TestBed.inject(DiplomaInstructorRequestService);
    professorsService = TestBed.inject(ProfessorsService);

    fixture = TestBed.createComponent(InstructorComponent);
    component = fixture.componentInstance;
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should load data', () => {
    const filterRequests = spyOn(diplomaInstructorRequestService, 'filterRequests').and.callThrough();
    const filterByQuery = spyOn(professorsService, 'filterByQuery').and.callThrough();

    fixture.detectChanges();

    expect(filterRequests).toHaveBeenCalledWith(
      jasmine.objectContaining({
        fromId: '1',
      }),
    );

    expect(filterByQuery).toHaveBeenCalledWith(
      jasmine.objectContaining({
        departmentId: '2',
        isActive: true,
      }),
    );

    expect(component.requests).toEqual(
      jasmine.objectContaining(([{ id: '1' }, { id: '2' }]),
    ));

    expect(component.professors).toEqual(
      jasmine.objectContaining(([{ id: '1' }]),
    ));
  });
});
