import { UsersService } from './../../../services/users.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Student } from './../../../models/student';
import { StudentsService } from './../../../services/students.service';
import { StudentFormComponent } from './../student-form/student-form.component';
import { filter } from 'rxjs/operators';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.scss']
})
export class StudentsComponent implements OnInit {

  public students: Student[] = [];

  constructor(
    private _studentsService: StudentsService,
    private _dialogService: MatDialog,
    private _usersService: UsersService,
  ) { }

  ngOnInit(): void {
    this._studentsService.getStudents().subscribe(students => this.students = students);
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: File = target.files[0];


      const formData = new FormData();
      formData.append('file', file);

      this._studentsService.upload(formData).subscribe(students => this.students = [...students, ...this.students]);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

  public addStudent(): void {
    this._dialogService.open(StudentFormComponent).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((s: Student) => this.students = [s, ...this.students]);
  }

  public onClearBtnClick(id: string) {
    this._usersService.deactivate(id).subscribe(() => {
      this.students = this.students.filter(s => s.id !== id);
    });
  }
}
