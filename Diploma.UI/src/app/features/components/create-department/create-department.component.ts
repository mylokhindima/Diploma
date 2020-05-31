import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { DepartmentsService } from './../../../services/departments.service';

@Component({
  selector: 'app-create-department',
  templateUrl: './create-department.component.html',
  styleUrls: ['./create-department.component.scss']
})
export class CreateDepartmentComponent {

  public submitted: boolean = false;

  public readonly form: FormGroup;

  constructor(
    private _departmentService: DepartmentsService,
    private _dialogRef: MatDialogRef<any, any>,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
    });
  }

  public add(): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this._departmentService.create(this.form.value).subscribe(d => this._dialogRef.close(d), () => {
      this.form.setErrors({
        duplicate: true,
      });
    });
  }

}

