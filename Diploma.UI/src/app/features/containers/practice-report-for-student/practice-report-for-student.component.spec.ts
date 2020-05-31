import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeReportForStudentComponent } from './practice-report-for-student.component';

describe('PracticeReportForStudentComponent', () => {
  let component: PracticeReportForStudentComponent;
  let fixture: ComponentFixture<PracticeReportForStudentComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeReportForStudentComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeReportForStudentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
