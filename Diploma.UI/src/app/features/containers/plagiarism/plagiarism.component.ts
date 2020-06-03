import { ReportsWithCommentsComponent } from './../reports-with-comments/reports-with-comments.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DiplomaReport } from './../../../models/diploma-report';
import { Step } from './../../../models/step.enum';
import { DiplomasService } from './../../../services/diplomas.service';
import { ProfileService } from './../../../services/profile.service';
import { filter, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-plagiarism',
  templateUrl: './plagiarism.component.html',
  styleUrls: ['./plagiarism.component.scss']
})
export class PlagiarismComponent implements OnInit {

  @ViewChild(ReportsWithCommentsComponent, { static: true }) reportsWithComments: ReportsWithCommentsComponent;

  public reports: DiplomaReport[] = [];

  constructor(
    private _diplomasService: DiplomasService,
  ) { }

  ngOnInit(): void {
    this._diplomasService.filterMainReports({
      step: Step.Plagiarism,
    }).subscribe(reports => this.reports = reports);
  }


  public accept(report: DiplomaReport): void {
    this._diplomasService.passPlagiarism(report.diplomaId).subscribe(() => this.reports = this.reports.filter(r => r.id !== report.id));
  }

  public decline(report: DiplomaReport): void {
    this.reportsWithComments.addComment(report).pipe(
      filter(Boolean),
      switchMap(() => this._diplomasService.failPlagiarism(report.diplomaId))
    ).subscribe(() => this.reports = this.reports.filter(r => r.id !== report.id));
  }

}
