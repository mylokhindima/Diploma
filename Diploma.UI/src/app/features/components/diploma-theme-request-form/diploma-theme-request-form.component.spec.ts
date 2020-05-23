import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaThemeRequestFormComponent } from './diploma-theme-request-form.component';

describe('DiplomaThemeRequestFormComponent', () => {
  let component: DiplomaThemeRequestFormComponent;
  let fixture: ComponentFixture<DiplomaThemeRequestFormComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaThemeRequestFormComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaThemeRequestFormComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
