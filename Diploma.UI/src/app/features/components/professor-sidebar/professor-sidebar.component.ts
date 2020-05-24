import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { Role } from '../../../models/role.enum';

@Component({
  selector: 'app-professor-sidebar',
  templateUrl: './professor-sidebar.component.html',
  styleUrls: ['./professor-sidebar.component.scss']
})
export class ProfessorSidebarComponent implements OnInit {

  public get isMethodologicalCommitteeMember(): boolean {
    const professor = this._profileService.user$.getValue();

    return professor.roles.some(r => r === Role.MethodologicalCommitteeMember);
  }

  public get isResponsibleForGraduation(): boolean {
    const professor = this._profileService.user$.getValue();

    return professor.roles.some(r => r === Role.ResponsibleForGraduation);
  }

  constructor(
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {
  }

}
