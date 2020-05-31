import { ProfileService } from './../../../services/profile.service';
import { ProfessorsService } from './../../../services/professors.service';
import { Component, OnInit } from '@angular/core';
import { Professor } from 'src/app/models/proffesor';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-roles',
  templateUrl: './roles.component.html',
  styleUrls: ['./roles.component.scss']
})
export class RolesComponent implements OnInit {

  public professors: Professor[] = [];

  constructor(
    private _profileService: ProfileService,
    private _professorsService: ProfessorsService,
    private toastr: ToastrService,
  ) { }

  public ngOnInit(): void {
    const professor = this._profileService.professor$.getValue();

    this._professorsService.filterByQuery({
      isActive: true,
      departmentId: professor.departmentId,
    }).subscribe(professors => this.professors = professors.filter(p => p.id !== professor.id));
  }


  public save(): void {
    this._professorsService.setRolesMany(this.professors.map(p => ({
      professorId: p.id,
      roles: p.roles,
    }))).subscribe(() => {
        this.toastr.success('Данні збережені', 'Повідомлення!');
    });
  }
}
