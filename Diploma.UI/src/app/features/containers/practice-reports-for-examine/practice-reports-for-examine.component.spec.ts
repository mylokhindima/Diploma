import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeReportsForExamineComponent } from './practice-reports-for-examine.component';

describe('PracticeReportsForExamineComponent', () => {
  let component: PracticeReportsForExamineComponent;
  let fixture: ComponentFixture<PracticeReportsForExamineComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeReportsForExamineComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeReportsForExamineComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
