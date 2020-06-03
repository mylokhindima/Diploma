import { BehaviorSubject } from 'rxjs';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { ViewCommentsComponent } from '../../components/view-comments/view-comments.component';
import { DiplomaReport } from './../../../models/diploma-report';
import { DiplomasService } from './../../../services/diplomas.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';
import { Diploma } from 'src/app/models/diploma';

@Component({
  selector: 'app-diploma-main-report',
  templateUrl: './diploma-main-report.component.html',
  styleUrls: ['./diploma-main-report.component.scss']
})
export class DiplomaMainReportComponent implements OnInit {

  public diploma: Diploma = null;

  public report: DiplomaReport = null;

  public loaded: BehaviorSubject<boolean> = new BehaviorSubject(false);

  constructor(
    private _profileService: ProfileService,
    private _staticService: StaticService,
    private _diplomasService: DiplomasService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this.diploma = this._profileService.diploma$.getValue();
    this._diplomasService.findDiplomaReport(this.diploma.mainReportId).subscribe(report => {
      this.report = report;
      this.loaded.next(true);
    });
  }

  public openView(): void {
    this._matDialog.open(ViewCommentsComponent, {
      data: this.report.comments
    });
  }

  public download(): void {
    this._staticService.download('reports/' + this.report.file.path, this.report.file.name);
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: File = target.files[0];

      const formData = new FormData();
      formData.append('file', file);

      const diploma = this._profileService.diploma$.getValue();

      this._diplomasService.uploadMainReport(diploma.id, formData).subscribe(report => this.report = report);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

}
