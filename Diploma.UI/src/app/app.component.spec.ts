import { TestBed, async } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { AppComponent } from './app.component';
import { Observable, of } from 'rxjs';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

class AuthServiceStub {
  public getToken(): string {
    return null;
  }
}

class DataServiceStub {
  public loadMyInfo(): Observable<any> {
    return of(null);
  }
}

describe('AppComponent', () => {
  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule
      ],
      providers: [
        { provide: AuthService, useClass: AuthServiceStub },
        { provide: DataService, useClass: DataServiceStub }
      ],
      declarations: [
        AppComponent
      ],
    }).compileComponents();
  }));

  it('should create the app', () => {
    const fixture = TestBed.createComponent(AppComponent);
    const app = fixture.componentInstance;
    expect(app).toBeTruthy();
  });
});
