import { DiplomasService } from './../../../services/diplomas.service';
import { MatDialog } from '@angular/material/dialog';
import { DiplomaReport } from './../../../models/diploma-report';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { EditableCommentComponent } from '../../components/editable-comment/editable-comment.component';
import { filter, switchMap } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-reports-with-comments',
  templateUrl: './reports-with-comments.component.html',
  styleUrls: ['./reports-with-comments.component.scss']
})
export class ReportsWithCommentsComponent implements OnInit {

  @Input() reports: DiplomaReport[] = [];

  @Input() subheader: string;
  @Input() public actionsContent: ElementRef<HTMLElement>;

  constructor(
    private _matDialog: MatDialog,
    private _diplomasService: DiplomasService,
  ) { }

  ngOnInit(): void {
  }

  public onAddComment(report: DiplomaReport): void {
    this.addComment(report).subscribe(res => {
      const index = this.reports.indexOf(report);

      this.reports[index] = res;
    });
  }

  public addComment(report: DiplomaReport): Observable<DiplomaReport> {
    return this._matDialog.open(EditableCommentComponent).afterClosed().pipe(
      filter(Boolean),
      switchMap((text: string) => this._diplomasService.createComment(report.id, text))
    );
  }


}
