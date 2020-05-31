import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeReportForExamineComponent } from './practice-report-for-examine.component';

describe('PracticeReportForExamineComponent', () => {
  let component: PracticeReportForExamineComponent;
  let fixture: ComponentFixture<PracticeReportForExamineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeReportForExamineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeReportForExamineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
