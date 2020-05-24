import { TestBed } from '@angular/core/testing';
import { AuthService } from './../../services/auth.service';
import { AuthGuard } from './auth.guard';
import { RouterTestingModule } from '@angular/router/testing';


class AuthServiceStub {}

describe('AuthGuard', () => {
  let guard: AuthGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [
        RouterTestingModule.withRoutes([])
      ],
      providers: [
        {
          provide: AuthService,
          useClass: AuthServiceStub,
        },
      ]
    });
    guard = TestBed.inject(AuthGuard);
  });

  it('should be created', () => {
    expect(guard).toBeTruthy();
  });
});
