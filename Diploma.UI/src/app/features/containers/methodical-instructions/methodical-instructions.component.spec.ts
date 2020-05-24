import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MethodicalInstructionsComponent } from './methodical-instructions.component';

describe('MethodicalInstructionsComponent', () => {
  let component: MethodicalInstructionsComponent;
  let fixture: ComponentFixture<MethodicalInstructionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MethodicalInstructionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MethodicalInstructionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
