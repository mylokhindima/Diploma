import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaRecordComponent } from './diploma-record.component';

describe('DiplomaRecordComponent', () => {
  let component: DiplomaRecordComponent;
  let fixture: ComponentFixture<DiplomaRecordComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaRecordComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaRecordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
