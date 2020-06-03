import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ReportsWithCommentsComponent } from './reports-with-comments.component';

describe('ReportsWithCommentsComponent', () => {
  let component: ReportsWithCommentsComponent;
  let fixture: ComponentFixture<ReportsWithCommentsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ReportsWithCommentsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ReportsWithCommentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
