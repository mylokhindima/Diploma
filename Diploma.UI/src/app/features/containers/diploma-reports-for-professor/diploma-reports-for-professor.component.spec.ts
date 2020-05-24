import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaReportsForProfessorComponent } from './diploma-reports-for-professor.component';

describe('DiplomaReportsForProfessorComponent', () => {
  let component: DiplomaReportsForProfessorComponent;
  let fixture: ComponentFixture<DiplomaReportsForProfessorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaReportsForProfessorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaReportsForProfessorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
