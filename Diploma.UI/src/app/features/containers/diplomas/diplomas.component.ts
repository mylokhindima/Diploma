import { DiplomaReport } from './../../../models/diploma-report';
import { Step } from './../../../models/step.enum';
import { Component, OnInit } from '@angular/core';
import { DiplomasService } from './../../../services/diplomas.service';
import { ProfileService } from '../../../services/profile.service';

@Component({
  selector: 'app-diplomas',
  templateUrl: './diplomas.component.html',
  styleUrls: ['./diplomas.component.scss']
})
export class DiplomasComponent implements OnInit {

  public reports: DiplomaReport[] = [];

  constructor(
    private _diplomasService: DiplomasService,
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    const professor = this._profileService.professor$.getValue();

    this._diplomasService.filterMainReports({
      instructorId: professor.id,
      step: Step.DiplomaReport,
    }).subscribe(reports => this.reports = reports);
  }


  public accept(report: DiplomaReport): void {
    this._diplomasService.acceptByInstructor(report.diplomaId).subscribe(() => this.reports = this.reports.filter(r => r.id !== report.id));
  }
}
