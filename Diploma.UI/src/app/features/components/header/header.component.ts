import { Router } from '@angular/router';
import { AuthService } from './../../../services/auth.service';
import { User } from './../../../models/user';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  public user$: Observable<User>;

  constructor(
    public profileService: ProfileService,
    public authService: AuthService,
    private router: Router,
  ) {
    this.user$ = this.profileService.user$.asObservable();
  }

  ngOnInit(): void {
  }

  public logout(): void {
    this.authService.logout();
    this.router.navigateByUrl('sign-in');
  }
}
