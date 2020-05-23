import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.enum';
import { ProfileService } from '../../../services/profile.service';

enum SidebarType {
  Admin,
  Student
}

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  opened: boolean;

  public sidebarType: SidebarType;

  constructor(
    private _profileService: ProfileService,
  ) {
    const user = this._profileService.user$.getValue();

    if (user.roles.includes(Role.Admin)) {
      this.sidebarType = SidebarType.Admin;
    } else if (user.roles.includes(Role.Student)) {
      this.sidebarType = SidebarType.Student;
    }
  }

  ngOnInit(): void {
  }

  public onMenuButtonClick() {
    this.opened = !this.opened;
  }
}
