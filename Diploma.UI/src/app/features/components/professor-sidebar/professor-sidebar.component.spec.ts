import { ProfileService } from './../../../services/profile.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfessorSidebarComponent } from './professor-sidebar.component';
import { BehaviorSubject } from 'rxjs';

class ProfileServiceStub {
  user$ = new BehaviorSubject({ roles: [] });
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1' });
}


describe('ProfessorSidebarComponent', () => {
  let component: ProfessorSidebarComponent;
  let fixture: ComponentFixture<ProfessorSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProfileService, useClass: ProfileServiceStub }
      ],
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
