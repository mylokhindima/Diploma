import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateEducationalProgramComponent } from './create-educational-program.component';

describe('CreateEducationalProgramComponent', () => {
  let component: CreateEducationalProgramComponent;
  let fixture: ComponentFixture<CreateEducationalProgramComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CreateEducationalProgramComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateEducationalProgramComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
