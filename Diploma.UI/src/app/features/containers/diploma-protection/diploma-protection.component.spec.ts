import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaProtectionComponent } from './diploma-protection.component';

describe('DiplomaProtectionComponent', () => {
  let component: DiplomaProtectionComponent;
  let fixture: ComponentFixture<DiplomaProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
