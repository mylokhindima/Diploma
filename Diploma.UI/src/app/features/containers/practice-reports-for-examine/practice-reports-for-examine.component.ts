import { Component, OnInit } from '@angular/core';
import { ProfileService } from '../../../services/profile.service';
import { Practice } from './../../../models/practice';
import { PracticesService } from './../../../services/practices.service';

@Component({
  selector: 'app-practice-reports-for-examine',
  templateUrl: './practice-reports-for-examine.component.html',
  styleUrls: ['./practice-reports-for-examine.component.scss']
})
export class PracticeReportsForExamineComponent implements OnInit {

  public practices: Practice[] = [];

  constructor(
    private _practicesService: PracticesService,
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {
    this._practicesService.filter({
      instructorId: this._profileService.professor$.getValue().id,
    }).subscribe(practices => this.practices = practices);
  }

}


