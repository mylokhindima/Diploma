import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { TimeSection } from './../../../models/time-section';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-diploma-record',
  templateUrl: './diploma-record.component.html',
  styleUrls: ['./diploma-record.component.scss']
})
export class DiplomaRecordComponent implements OnInit {

  public section: TimeSection = null;

  public loaded: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private _profileService: ProfileService,
    private _diplomaProtectionsService: DiplomaProtectionsService,
  ) {

  }

  ngOnInit(): void {
    const student = this._profileService.student$.getValue();

    this._diplomaProtectionsService.filterSections(student.id).subscribe(section => {
      this.section = section;

      this.loaded.next(true);
    });
  }

  public onAdded(data: any): void {
    const student = this._profileService.student$.getValue();

    this._diplomaProtectionsService.record(data.timeSectionId, student.id).subscribe(section => {
      this.section = section;
    });
  }

}
