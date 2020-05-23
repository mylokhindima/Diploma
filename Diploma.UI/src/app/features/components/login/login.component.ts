import { AuthService } from './../../../services/auth.service';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FormGroup, FormControl, Validators, AbstractControl } from '@angular/forms';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent {

  public form: FormGroup;

  constructor(
    private router: Router,
    private _authService: AuthService,
  ) {
    this.form = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    });
  }

  login() {
    if (this.form.valid) {
      this._authService.signIn(this.form.value).subscribe(() => {
        this.router.navigateByUrl('');
      }, () => {
        this.form.setErrors({
          bad: true,
        });
      });
    }
  }

  getErrorMessage(control: AbstractControl) {
    if (control.hasError('required')) {
      return 'Введіть значення';
    } else if (control.hasError('email')) {
      return 'Некоректна пошта';
    } else if (control.hasError('minLength')) {
      return 'Пароль повинен містити не меньше 6 символів';
    }
  }
}
