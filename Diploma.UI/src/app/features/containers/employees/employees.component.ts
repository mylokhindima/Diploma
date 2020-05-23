import { UsersService } from './../../../services/users.service';
import { ProfessorsService } from './../../../services/professors.service';
import { Professor } from './../../../models/proffesor';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { EmployeeFormComponent } from '../employee-form/employee-form.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-employees',
  templateUrl: './employees.component.html',
  styleUrls: ['./employees.component.scss']
})
export class EmployeesComponent implements OnInit {

  public professors: Professor[] = [];

  constructor(
    private _professorsService: ProfessorsService,
    private _usersService: UsersService,
    private _dialogService: MatDialog,
  ) { }

  ngOnInit(): void {
    this._professorsService.getProfessors().subscribe(professors => {
      this.professors = professors;
    });
  }

  public onClearBtnClick(id: string) {
    this._usersService.deactivate(id).subscribe(() => {
      this.professors = this.professors.filter(s => s.id !== id);
    });
  }



  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: File = target.files[0];


      const formData = new FormData();
      formData.append('file', file);

      this._professorsService.upload(formData).subscribe(professors => this.professors = [...professors, ...this.professors]);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

  public addNewEmployee() {

    this._dialogService.open(EmployeeFormComponent).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((p: Professor) => this.professors = [p, ...this.professors]);
  }
}
