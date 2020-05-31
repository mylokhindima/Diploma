import { EducationalProgramService } from './../../../services/educational-program.service';
import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { formView } from '../../../core/utils/educational-form-view';

@Component({
  selector: 'app-create-educational-program',
  templateUrl: './create-educational-program.component.html',
  styleUrls: ['./create-educational-program.component.scss']
})
export class CreateEducationalProgramComponent implements OnInit {

  public submitted: boolean = false;

  public readonly form: FormGroup;

  constructor(
    private _educationalProgramsService: EducationalProgramService,
    private _dialogRef: MatDialogRef<any, any>,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      degree: new FormControl('', [Validators.required]),
      form: new FormControl('', [Validators.required]),
      duration: new FormControl('', [Validators.required]),
    });
  }

  ngOnInit(): void {
  }

  public add(): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this._educationalProgramsService.create({
      specialtyId: this.data.specialtyId,
      ...this.form.value
    }).subscribe(d => this._dialogRef.close(d), () => {
      this.form.setErrors({
        duplicate: true,
      });
    });
  }

  public formView(a): string {
    return formView(a);
  }
}
