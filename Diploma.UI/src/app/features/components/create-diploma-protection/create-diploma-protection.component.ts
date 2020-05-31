import { takeUntil } from 'rxjs/operators';
import { Subject } from 'rxjs';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { EducationalProgramService } from './../../../services/educational-program.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Component, OnInit, OnDestroy } from '@angular/core';
import { EducationalProgram } from 'src/app/models/educational-program';
import { DiplomaProtection } from 'src/app/models/diploma-protection';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-create-diploma-protection',
  templateUrl: './create-diploma-protection.component.html',
  styleUrls: ['./create-diploma-protection.component.scss']
})
export class CreateDiplomaProtectionComponent implements OnInit, OnDestroy {

  public form: FormGroup;

  public programs: EducationalProgram[] = [];
  public protections: DiplomaProtection[] = [];

  public submitted = false;

  public availableStartTime: number[] = [];
  public availableEndTime: number[] = [];

  public get tomorrow(): Date {
    const date = new Date();

    date.setDate(date.getDate() + 1);

    return date;
  }

  public dateFilter(date: Date): boolean {
    const educationalProgramId = this.form.get('educationalProgramId').value;

    if (!educationalProgramId) { return true; }

    const protections = this.protections.filter(p => p.educationalProgramId === educationalProgramId);

    if (!protections.length) { return true; }

    return !protections.some(p => new Date(p.timeStart).toDateString() === date.toDateString());
  }

  private _destroy$ = new Subject<void>();

  constructor(
    private _educationalProgramService: EducationalProgramService,
    private _diplomaProtections: DiplomaProtectionsService,
    private _dialogRef: MatDialogRef<any, any>,
  ) {
    this.form = new FormGroup({
      educationalProgramId: new FormControl('', [Validators.required]),
      timeStart: new FormControl('', [Validators.required]),
      timeEnd: new FormControl('', [Validators.required]),
      date: new FormControl('', [Validators.required])
    });

    this.initTime();
  }

  public ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    this._educationalProgramService.getPrograms().subscribe(programs => this.programs = programs);
    this._diplomaProtections.getDiplomaProtections().subscribe(protections => this.protections = protections);

    this.form.get('timeStart').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this._initEndTime(value + 0.5);
    });

    this.form.get('timeEnd').valueChanges.pipe(takeUntil(this._destroy$)).subscribe(value => {
      this._initStartTime(value - 0.5);
    });
  }

  public save(): void {
    if (this.form.invalid) { return; }

    const date = this.form.get('date').value;

    const getTime = (value) => {
      const time = new Date(date.getTime());

      const minute = !Number.isInteger(value) && 30;

      time.setHours(Math.floor(value), minute);

      return time;
    };

    this._diplomaProtections.create({
      timeStart: getTime(this.form.get('timeStart').value),
      timeEnd: getTime(this.form.get('timeEnd').value),
      educationalProgramId: this.form.get('educationalProgramId').value,
    } as any).subscribe(p => {
      this._dialogRef.close(p);
    });
  }

  public initTime(): void {
    this._initStartTime(17.5);
    this._initEndTime(7.5);
  }

  private _initStartTime(endTo): void {
    this.availableStartTime = [];

    for (let i = 7; i <= endTo; i += 0.5) {
      this.availableStartTime.push(i);
    }
  }


  private _initEndTime(startFrom): void {
    this.availableEndTime = [];

    for (let i = startFrom; i <= 18; i += 0.5) {
      this.availableEndTime.push(i);
    }
  }

  public convert(x: number): string {
    return Number.isInteger(x) ? `${x}:00` : `${Math.floor(x)}:30`;
  }

}
