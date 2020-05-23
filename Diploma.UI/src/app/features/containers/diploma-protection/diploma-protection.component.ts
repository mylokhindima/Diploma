import { DiplomaProtection } from './../../../models/diploma-protection';
import { ProfileService } from './../../../services/profile.service';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { Component, OnInit } from '@angular/core';
import { Diploma } from 'src/app/models/diploma';
import { Student } from 'src/app/models/student';
import { tap } from 'rxjs/operators';

@Component({
  selector: 'app-diploma-protection',
  templateUrl: './diploma-protection.component.html',
  styleUrls: ['./diploma-protection.component.scss']
})
export class DiplomaProtectionComponent implements OnInit {

  public diploma: Diploma;
  public student: Student;

  public protections: DiplomaProtection[] = [];

  constructor(
    private _diplomaProtectionsService: DiplomaProtectionsService,
    private _profileService: ProfileService,
  ) {
  }

  ngOnInit(): void {
    this.diploma = this._profileService.diploma$.getValue();
    this.student = this._profileService.student$.getValue();
    this._diplomaProtectionsService.findProtectionsByEducationalProgram(this.student.educationalProgramId)
      .pipe(tap(console.log))
      .subscribe(
        protections => this.protections = protections,
      );
  }

}
