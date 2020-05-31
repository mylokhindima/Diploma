import { Component, OnInit } from '@angular/core';
import { Role } from './../../../models/role.enum';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-professor-sidebar',
  templateUrl: './professor-sidebar.component.html',
  styleUrls: ['./professor-sidebar.component.scss']
})
export class ProfessorSidebarComponent implements OnInit {

  public Role = Role;

  constructor(
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

  public hasRole(role: Role): boolean {
    const professor = this._profileService.user$.getValue();

    return professor.roles.some(r => r === role);
  }

}
