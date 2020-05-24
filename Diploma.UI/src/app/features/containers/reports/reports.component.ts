import { MatDialog } from '@angular/material/dialog';
import { StaticService } from './../../../services/static.service';
import { Component, OnInit, Input, ElementRef } from '@angular/core';
import { DiplomaReport } from '../../../models/diploma-report';
import { ViewCommentsComponent } from '../../components/view-comments/view-comments.component';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.component.html',
  styleUrls: ['./reports.component.scss']
})
export class ReportsComponent implements OnInit {

  @Input() public reports: DiplomaReport[] = [];
  @Input() public valueContent: ElementRef<HTMLElement>;

  constructor(
    private _staticService: StaticService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
  }

  public download(report: DiplomaReport): void {
    this._staticService.download('reports/' + report.file.path, report.file.name);
  }

  public openView(report: DiplomaReport): void {
    this._matDialog.open(ViewCommentsComponent, {
      data: report.comments
    });
  }

}
