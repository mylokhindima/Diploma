import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { isNil } from 'lodash';
import { Subject } from 'rxjs';
import { filter, takeUntil, switchMap } from 'rxjs/operators';
import { EducationalProgram } from '../../../models/educational-program';
import { SpecialtiesService } from '../../../services/specialties.service';
import { CreateStudentDTO } from './../../../models/create-student.dto';
import { EducationalForm } from './../../../models/educational-form.enum';
import { Specialty } from './../../../models/specialty';
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

  // public specialties: Specialty[] = [];
  public programs: EducationalProgram[] = [];
  public viewPrograms: EducationalProgram[] = [];

  // public durations: Set<number> = new Set();
  // public educationalForms: Set<EducationalForm> = new Set();

  public submitted: boolean = false;

  public currentProgram: EducationalProgram = null;

  // public get showClearBtn(): boolean {
  //   const { duration, specialty, form } = this.form.controls;

  //   return [duration, specialty, form].some(c => !isNil(c.value));
  // }

  // private _specialties: Specialty[] = [];

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
    // this._specialtiesService.getSpecialties().subscribe(specialties => {
    //   this._specialties = specialties;
    //   this.specialties = specialties;
    // });

    this._educationalProgramsService.getPrograms().subscribe(programs => {
      this.programs = programs;

      // this.durations = new Set(programs.map(p => p.duration).sort((a, b) => a - b));
      // this.educationalForms = new Set(programs.map(p => p.form));
    });

    this.form.get('educationalProgramId').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.currentProgram = this.programs.find(p => p.id === value);
    })

    this.form.get('degree').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this.form.get('educationalProgramId').reset();

      this.viewPrograms = this.programs.filter(p => p.degree === value);
    });

    // this.form.get('specialty').valueChanges.pipe(
    //   filter(v => !isNil(v)),
    //   takeUntil(this._destroy$)
    // ).subscribe(value => {
    //   const sp = this.programs.filter(p => p.specialtyId === value);

    //   this.educationalForms = new Set(sp.map(p => p.form));
    //   this.durations = new Set(sp.map(p => p.duration));
    // });

    // this.form.get('duration').valueChanges.pipe(
    //   filter(v => !isNil(v)),
    //   takeUntil(this._destroy$)
    // ).subscribe(value => {
    //   const programs = this.programs.filter(p => p.duration === value);

    //   this.educationalForms = new Set(programs.map(p => p.form));
    //   this.specialties = this._specialties.filter(s => programs.some(p => p.specialtyId === s.id));
    // });

    // this.form.get('form').valueChanges.pipe(
    //   filter(v => !isNil(v)),
    //   takeUntil(this._destroy$)
    // ).subscribe(value => {
    //   const programs = this.programs.filter(p => p.form === value);

    //   this.durations = new Set(programs.map(p => p.duration));
    //   this.specialties = this._specialties.filter(s => programs.some(p => p.specialtyId === s.id));
    // });
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

    this._studentsService.create(this.form.value).subscribe(s => this._dialogRef.close(s));
  }

  public formView(): string {
    switch (this.currentProgram.form) {
      case 0:
        return 'Денна';
      case 1:
        return 'Заочна';
      case 2:
        return 'Дистанційна';
    }
  }

  // private _prepareDTO(): CreateStudentDTO {
  //   const { name, email, degree, group, specialty, duration, form } = this.form.value;

  //   // const educationalProgramId = this.programs.find(p => p.specialtyId === specialty && p.duration === duration && p.form === form).id;

  //   const dto: CreateStudentDTO = {
  //     name,
  //     degree,
  //     email,
  //     group,
  //     educationalProgramId,
  //   };

  //   return dto;
  // }
}
