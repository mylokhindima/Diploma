import { DiplomasService } from './../../../services/diplomas.service';
import { Step } from './../../../models/step.enum';
import { DiplomaReport } from './../../../models/diploma-report';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-normscontrol',
  templateUrl: './normscontrol.component.html',
  styleUrls: ['./normscontrol.component.scss']
})
export class NormscontrolComponent implements OnInit {

  public reports: DiplomaReport[] = [];

  constructor(
    private _diplomasService: DiplomasService,
  ) { }

  ngOnInit(): void {
    this._diplomasService.filterMainReports({
      step: Step.Normscontrol,
    }).subscribe(reports => this.reports = reports);
  }


  public accept(report: DiplomaReport): void {
    this._diplomasService.passNormscontrol(report.diplomaId).subscribe(() => this.reports = this.reports.filter(r => r.id !== report.id));
  }
}
