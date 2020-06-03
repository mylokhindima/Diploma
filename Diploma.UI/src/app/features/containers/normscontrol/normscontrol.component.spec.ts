import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NormscontrolComponent } from './normscontrol.component';

describe('NormscontrolComponent', () => {
  let component: NormscontrolComponent;
  let fixture: ComponentFixture<NormscontrolComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NormscontrolComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NormscontrolComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
