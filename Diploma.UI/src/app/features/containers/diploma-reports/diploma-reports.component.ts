import { MatDialog } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';
import { DiplomaReport } from './../../../models/diploma-report';
import { DiplomasService } from './../../../services/diplomas.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';
import { Diploma } from 'src/app/models/diploma';
import { ViewCommentsComponent } from '../../components/view-comments/view-comments.component';

export interface Section {
  name: string;
  updated: Date;
}

@Component({
  selector: 'app-diploma-reports',
  templateUrl: './diploma-reports.component.html',
  styleUrls: ['./diploma-reports.component.scss']
})
export class DiplomaReportsComponent implements OnInit {

  public reports: DiplomaReport[] = [];

  private _diploma: Diploma;

  constructor(
    private _diplomasService: DiplomasService,
    private _profileService: ProfileService,
    private _staticService: StaticService,
    private _matDialog: MatDialog
  ) { }

  ngOnInit(): void {
    this._diploma = this._profileService.diploma$.getValue();

    this._diplomasService.findDiplomaReports(this._diploma.id).subscribe(reports => {
      this.reports = reports;
    });
  }

  public download(report: DiplomaReport): void {
    this._staticService.download('reports/' + report.file.path, report.file.name);
  }

  public openView(report: DiplomaReport): void {
    this._matDialog.open(ViewCommentsComponent, {
      data: report.comments
    });
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: File = target.files[0];


      const formData = new FormData();
      formData.append('file', file);

      this._diplomasService.uploadReport(this._diploma.id, formData).subscribe(report => this.reports = [report, ...this.reports]);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

}
