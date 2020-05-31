import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { isNil } from 'lodash';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { formView } from '../../../core/utils/educational-form-view';
import { EducationalProgram } from '../../../models/educational-program';
import { SpecialtiesService } from '../../../services/specialties.service';
import { StudentDegree } from './../../../models/student-degree.enum';
import { EducationalProgramService } from './../../../services/educational-program.service';
import { StudentsService } from './../../../services/students.service';

interface SelectableDegree {
  key: string;
  value;
}

@Component({
  selector: 'app-student-form',
  templateUrl: './student-form.component.html',
  styleUrls: ['./student-form.component.scss']
})
export class StudentFormComponent implements OnInit, OnDestroy {

  public programs: EducationalProgram[] = [];
  public viewPrograms: EducationalProgram[] = [];

  public submitted: boolean = false;

  public currentProgram: EducationalProgram = null;

  private _destroy$ = new Subject<void>();

  public readonly degrees: SelectableDegree[] = [
    { key: 'Бакалавр', value: StudentDegree.Bachelor },
    { key: 'Магістр', value: StudentDegree.Master },
  ];

  public readonly form: FormGroup;

  constructor(
    private _specialtiesService: SpecialtiesService,
    private _studentsService: StudentsService,
    private _educationalProgramsService: EducationalProgramService,
    private _dialogRef: MatDialogRef<any, any>,
  ) {
    this.form = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      degree: new FormControl(null, [Validators.required]),
      group: new FormControl('', [Validators.required, Validators.minLength(6)]),
      educationalProgramId: new FormControl('', [Validators.required]),
    });
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  public ngOnInit(): void {

    this._educationalProgramsService.getPrograms().subscribe(programs => {
      this.programs = programs;
    });

    this.form.get('educationalProgramId').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.currentProgram = this.programs.find(p => p.id === value);
    })

    this.form.get('degree').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.form.get('educationalProgramId').reset();

      this.viewPrograms = this.programs.filter(p => p.degree === value);
    });
  }

  public clearEducationFormGroup(): void {
    const degree = this.form.get('degree');

    if (!isNil(degree.value)) {
      degree.setValue(degree.value);
    } else {
      const { duration, specialty, form } = this.form.controls;

      [duration, specialty, form].forEach(c => {
        c.reset();
      });
    }

  }

  public add(): void {
    this.submitted = true;

    if (this.form.invalid) { return; }

    this._studentsService.create(this.form.value).subscribe(s => this._dialogRef.close(s), () => {
      this.form.get('email').setErrors({
        duplicate: true,
      });
    });
  }

  public formView(): string {
    return formView(this.currentProgram.form);
  }
}
