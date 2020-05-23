import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaReportsComponent } from './diploma-reports.component';

describe('DiplomaReportsComponent', () => {
  let component: DiplomaReportsComponent;
  let fixture: ComponentFixture<DiplomaReportsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaReportsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaReportsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
