import { Component, EventEmitter, Output, Input } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiplomaInstructorThemeRequest } from './../../../models/diploma-instructor-theme-request';

@Component({
  selector: 'app-diploma-theme-request-form',
  templateUrl: './diploma-theme-request-form.component.html',
  styleUrls: ['./diploma-theme-request-form.component.scss']
})
export class DiplomaThemeRequestFormComponent {

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  @Input() public requests: DiplomaInstructorThemeRequest[] = [];

  public submitted = false;

  public readonly form: FormGroup = new FormGroup({
    theme: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required),
  });

  constructor() { }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }

}
