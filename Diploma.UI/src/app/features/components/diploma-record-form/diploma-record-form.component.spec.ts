import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaRecordFormComponent } from './diploma-record-form.component';

describe('DiplomaRecordFormComponent', () => {
  let component: DiplomaRecordFormComponent;
  let fixture: ComponentFixture<DiplomaRecordFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaRecordFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaRecordFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
