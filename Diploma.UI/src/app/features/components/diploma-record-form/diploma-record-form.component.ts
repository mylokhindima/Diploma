import { ProfileService } from './../../../services/profile.service';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { TimeSection } from './../../../models/time-section';
import { DiplomaProtection } from './../../../models/diploma-protection';
import { Component, OnInit, OnDestroy, Output, EventEmitter } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Subject } from 'rxjs';
import { distinctUntilChanged } from 'rxjs/operators';

@Component({
  selector: 'app-diploma-record-form',
  templateUrl: './diploma-record-form.component.html',
  styleUrls: ['./diploma-record-form.component.scss']
})
export class DiplomaRecordFormComponent implements OnInit, OnDestroy {
  @Output() added: EventEmitter<any> = new EventEmitter<any>();

  public submitted = false;

  public protections: DiplomaProtection[] = [];
  public sections: TimeSection[] = [];

  public availableSections: TimeSection[] = [];

  public form: FormGroup;

  public dateFilter(date: Date): boolean {
    return !!this.protections.find(p => new Date(p.timeStart).toDateString() === date.toDateString());
  }

  private _destroy$ = new Subject<void>();

  constructor(
    private _diplomaProtections: DiplomaProtectionsService,
    private _profileService: ProfileService,
  ) {
    this.form = new FormGroup({
      date: new FormControl('', [Validators.required]),
      timeSectionId: new FormControl('', [Validators.required]),
    });
  }

  ngOnDestroy(): void {
    this._destroy$.next();
    this._destroy$.complete();
  }

  ngOnInit(): void {
    const student = this._profileService.student$.getValue();

    this.form.get('date').valueChanges.pipe(distinctUntilChanged()).subscribe(value => {
      this.form.get('timeSectionId').setValue(null);

      if (!value) {
        this.availableSections = [];
      } else {
        const protection = this.protections.find(p => new Date(p.timeStart).toDateString() === value.toDateString());

        this.availableSections = this.sections.filter(s => s.diplomaProtectionId === protection.id);
      }
    });

    this._diplomaProtections.findProtectionsByEducationalProgram(student.educationalProgramId).subscribe(protections => {
      this.protections = protections;
    });

    this._diplomaProtections.findSections().subscribe(sections => {
      this.sections = sections.filter(s => this.protections.map(p => p.id).includes(s.diplomaProtectionId)).filter(s => !s.studentId);
    });
  }


  public add(): void {
    if (this.form.invalid) { return; }

    this.added.emit(this.form.value);
  }

}
