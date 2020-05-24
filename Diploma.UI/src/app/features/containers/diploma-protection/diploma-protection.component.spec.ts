import { DiplomaProtection } from './../../../models/diploma-protection';
import { ProfileService } from './../../../services/profile.service';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DiplomaProtectionComponent } from './diploma-protection.component';
import { BehaviorSubject, of, Observable } from 'rxjs';


class DiplomaProtectionsServiceStub {
  public findProtectionsByEducationalProgram(educationalProgramId: string): Observable<DiplomaProtection[]> {
    return of([]);
  }
}
class ProfileServiceStub {
  diploma$ = new BehaviorSubject(null);
  student$ = new BehaviorSubject({ id: '1' });
}

describe('DiplomaProtectionComponent', () => {
  let component: DiplomaProtectionComponent;
  let fixture: ComponentFixture<DiplomaProtectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      providers: [
        { provide: DiplomaProtectionsService, useClass: DiplomaProtectionsServiceStub },
        { provide: ProfileService, useClass: ProfileServiceStub }
      ],
      declarations: [ DiplomaProtectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DiplomaProtectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
