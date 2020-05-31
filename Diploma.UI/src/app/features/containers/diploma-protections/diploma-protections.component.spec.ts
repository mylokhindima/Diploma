import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaProtectionsComponent } from './diploma-protections.component';

describe('DiplomaProtectionsComponent', () => {
  let component: DiplomaProtectionsComponent;
  let fixture: ComponentFixture<DiplomaProtectionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaProtectionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaProtectionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
