import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { BehaviorSubject, Observable, of } from 'rxjs';
import { Practice } from './../../../models/practice';
import { PracticesService } from './../../../services/practices.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';
import { PracticeReportComponent } from './practice-report.component';



class PracticesServiceStub {
  public getStudentPractice(studentId: string): Observable<Practice> {
    return of(null);
  }
}
class ProfileServiceStub {
  student$ = new BehaviorSubject({ id: '1' });
}
class StaticServiceStub {}

describe('PracticeReportComponent', () => {
  let component: PracticeReportComponent;
  let fixture: ComponentFixture<PracticeReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: PracticesService, useClass: PracticesServiceStub },
        { provide: ProfileService, useClass: ProfileServiceStub },
        { provide: StaticService, useClass: StaticServiceStub }
      ],
      declarations: [ PracticeReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
