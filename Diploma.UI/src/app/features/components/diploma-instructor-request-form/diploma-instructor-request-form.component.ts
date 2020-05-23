import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { DiplomaInstructorRequest } from '../../../models/diploma-instructor-request';
import { Professor } from '../../../models/proffesor';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-diploma-instructor-request-form',
  templateUrl: './diploma-instructor-request-form.component.html',
  styleUrls: ['./diploma-instructor-request-form.component.scss']
})
export class DiplomaInstructorRequestFormComponent {

  @Output() submitForm: EventEmitter<any> = new EventEmitter<any>();

  @Input() public professors: Professor[] = [];

  @Input() public requests: DiplomaInstructorRequest[] = [];

  public submitted = false;

  public readonly form: FormGroup = new FormGroup({
    toId: new FormControl(null, Validators.required),
    description: new FormControl(null, Validators.required)
  });

  constructor(
    private _profileService: ProfileService,
  ) { }

  public onSubmit(): void {
    this.submitted = true;

    if (this.form.valid) {
      this.submitForm.emit(this.form.value);
    }
  }


}
