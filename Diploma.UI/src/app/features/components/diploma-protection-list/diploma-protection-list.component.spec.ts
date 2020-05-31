import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaProtectionListComponent } from './diploma-protection-list.component';

describe('DiplomaProtectionListComponent', () => {
  let component: DiplomaProtectionListComponent;
  let fixture: ComponentFixture<DiplomaProtectionListComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaProtectionListComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaProtectionListComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
