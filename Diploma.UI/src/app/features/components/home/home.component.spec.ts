import { ProfileService } from './../../../services/profile.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { HomeComponent } from './home.component';
import { BehaviorSubject } from 'rxjs';

class ProfileServiceStub {
  user$ = new BehaviorSubject({ roles: [] });
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1' });
}

describe('HomeComponent', () => {
  let component: HomeComponent;
  let fixture: ComponentFixture<HomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: ProfileService, useClass: ProfileServiceStub }
      ],
      declarations: [ HomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(HomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
