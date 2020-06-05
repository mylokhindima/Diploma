import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Diploma } from '../../../models/diploma';
import { Professor } from './../../../models/proffesor';
import { DiplomasService } from './../../../services/diplomas.service';
import { ProfessorsService } from './../../../services/professors.service';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-students-info',
  templateUrl: './students-info.component.html',
  styleUrls: ['./students-info.component.scss']
})
export class StudentsInfoComponent implements OnInit {

  public dataSource: Diploma[] = [];
  public professors: Professor[] = [];

  public displayedColumns: string[] = ['name', 'group', 'instructor', 'theme'];

  public get availableProfessors(): Professor[] {
    return this.professors.filter(p => p.capacity && this.dataSource.filter(d => d.instructorId === p.id).length < p.capacity);
  }

  constructor(
    private _diplomasService: DiplomasService,
    private _professorsService: ProfessorsService,
    private _profileService: ProfileService,
    private toastr: ToastrService,
  ) { }

  ngOnInit(): void {
    this._diplomasService.filterDiplomas({}).subscribe(diplomas => {
      this.dataSource = diplomas;
    });
    this._professorsService.filterByQuery({
      departmentId: this._profileService.professor$.getValue().departmentId,
    }).subscribe(professor => this.professors = professor);
  }

  public save(): void {
    this._diplomasService.updateMany(this.dataSource).subscribe(diplomas => {
      this.dataSource = diplomas;
      this.toastr.success('Данні збережені', 'Повідомлення!');
    });
  }

  public getInstructorName(id: string): string {
    const p = this.professors.find(p => p.id === id);

    return p && p.name;
  }
}
