import { ProfessorsService } from './../../../services/professors.service';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Department } from './../../../models/department';
import { ProfessorDegree } from './../../../models/proffesor-degree.enum';
import { DepartmentsService } from './../../../services/departments.service';
import { MatDialogRef } from '@angular/material/dialog';

interface SelectableDegree {
  key: string;
  value: ProfessorDegree;
}

@Component({
  selector: 'app-employee-form',
  templateUrl: './employee-form.component.html',
  styleUrls: ['./employee-form.component.scss']
})
export class EmployeeFormComponent implements OnInit {

  public departments: Department[] = [];

  public submitted: boolean = false;

  public readonly degrees: SelectableDegree[] = [
    { key: 'Acистент', value: ProfessorDegree.Assistant },
    { key: 'Старший викладач', value: ProfessorDegree.SeniorLecturer },
    { key: 'Доцент', value: ProfessorDegree.Docent },
    { key: 'Професор', value: ProfessorDegree.Professor },
  ];

  public readonly form: FormGroup;

  constructor(
    private _departmentsService: DepartmentsService,
    private _professorsService: ProfessorsService,
    private _dialogRef: MatDialogRef<any, any>,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      degree: new FormControl('', [Validators.required]),
      departmentId: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
    this._departmentsService.getDepartments().subscribe(departments => this.departments = departments);
  }

  public add(): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this._professorsService.create(this.form.value).subscribe(s => this._dialogRef.close(s));
  }

}
