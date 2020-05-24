import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaReportsContainerComponent } from './diploma-reports-container.component';

describe('DiplomaReportsContainerComponent', () => {
  let component: DiplomaReportsContainerComponent;
  let fixture: ComponentFixture<DiplomaReportsContainerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DiplomaReportsContainerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaReportsContainerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
