import { Component, Input } from '@angular/core';
import { Practice } from '../../../models/practice';
import { StaticService } from './../../../services/static.service';

@Component({
  selector: 'app-practice-report',
  templateUrl: './practice-report.component.html',
  styleUrls: ['./practice-report.component.scss']
})
export class PracticeReportComponent {

  @Input() public practice: Practice;

  constructor(
    private _staticService: StaticService,
  ) { }

  public download(): void {
    this._staticService.download('reports/' + this.practice.file.path, this.practice.file.name);
  }

}
