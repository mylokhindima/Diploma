import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaMainReportComponent } from './diploma-main-report.component';

describe('DiplomaMainReportComponent', () => {
  let component: DiplomaMainReportComponent;
  let fixture: ComponentFixture<DiplomaMainReportComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaMainReportComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaMainReportComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
