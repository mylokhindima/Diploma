import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSidebarComponent } from './professor-sidebar.component';

describe('ProfessorSidebarComponent', () => {
  let component: ProfessorSidebarComponent;
  let fixture: ComponentFixture<ProfessorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfessorSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfessorSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
