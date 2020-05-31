import { SpecialtiesService } from './../../../services/specialties.service';
import { Component, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-create-specialty',
  templateUrl: './create-specialty.component.html',
  styleUrls: ['./create-specialty.component.scss']
})
export class CreateSpecialtyComponent {

  public submitted: boolean = false;

  public readonly form: FormGroup;

  constructor(
    private _dialogRef: MatDialogRef<any, any>,
    private _specialtiesService: SpecialtiesService,
    @Inject(MAT_DIALOG_DATA) private data: any,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      code:  new FormControl('', [Validators.required])
    });
  }

  public add(): void {
    this.submitted = true;

    if (this.form.invalid) { return; }
    this._specialtiesService.create({
      departmentId: this.data.departmentId,
      ...this.form.value,
    }).subscribe(s => this._dialogRef.close(s), () => {
      this.form.setErrors({
        duplicate: true,
      });
    });
  }
}
