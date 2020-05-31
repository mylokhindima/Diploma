import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateDiplomaProtectionComponent } from './create-diploma-protection.component';

describe('CreateDiplomaProtectionComponent', () => {
  let component: CreateDiplomaProtectionComponent;
  let fixture: ComponentFixture<CreateDiplomaProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateDiplomaProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateDiplomaProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
