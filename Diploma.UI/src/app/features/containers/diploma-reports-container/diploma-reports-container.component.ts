import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { filter, switchMap } from 'rxjs/operators';

import { DiplomaReport } from './../../../models/diploma-report';
import { DiplomasService } from './../../../services/diplomas.service';
import { EditableCommentComponent } from './../../components/editable-comment/editable-comment.component';

@Component({
  selector: 'app-diploma-reports-container',
  templateUrl: './diploma-reports-container.component.html',
  styleUrls: ['./diploma-reports-container.component.scss']
})
export class DiplomaReportsContainerComponent implements OnInit {

  public reports: DiplomaReport[] = [];

  constructor(
    private _diplomasService: DiplomasService,
    private _route: ActivatedRoute,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    const reports$ = this._diplomasService.findDiplomaReports(id);
    const diploma$ = this._diplomasService.find(id);

    forkJoin(reports$, diploma$).subscribe(([reports, diploma]) => {
      this.reports = reports.filter(r => r.id !== diploma.mainReportId);
    });
  }

  public addComment(report: DiplomaReport): void {
    this._matDialog.open(EditableCommentComponent).afterClosed().pipe(
      filter(Boolean),
      switchMap((text: string) => this._diplomasService.createComment(report.id, text))
    ).subscribe(res => {
      const index = this.reports.indexOf(report);

      this.reports[index] = res;
    });
  }

}
