import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ArchievesComponent } from './archieves.component';

describe('ArchievesComponent', () => {
  let component: ArchievesComponent;
  let fixture: ComponentFixture<ArchievesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ArchievesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ArchievesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
