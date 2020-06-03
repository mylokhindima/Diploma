import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { forkJoin } from 'rxjs';
import { DiplomaReport } from './../../../models/diploma-report';
import { DiplomasService } from './../../../services/diplomas.service';


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
  ) { }

  ngOnInit(): void {
    const id = this._route.snapshot.paramMap.get('id');

    const reports$ = this._diplomasService.findDiplomaReports(id);
    const diploma$ = this._diplomasService.find(id);

    forkJoin(reports$, diploma$).subscribe(([reports, diploma]) => {
      this.reports = reports.filter(r => r.id !== diploma.mainReportId);
    });
  }


}
