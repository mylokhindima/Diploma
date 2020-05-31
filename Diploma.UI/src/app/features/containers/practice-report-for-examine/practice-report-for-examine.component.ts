import { FormControl, Validators } from '@angular/forms';
import { PracticesService } from './../../../services/practices.service';
import { ActivatedRoute } from '@angular/router';
import { Component, OnInit } from '@angular/core';
import { Practice } from 'src/app/models/practice';

@Component({
  selector: 'app-practice-report-for-examine',
  templateUrl: './practice-report-for-examine.component.html',
  styleUrls: ['./practice-report-for-examine.component.scss']
})
export class PracticeReportForExamineComponent implements OnInit {

  public practice: Practice = null;

  public score: FormControl = new FormControl(null, [Validators.required, Validators.max(100), Validators.min(0)]);

  constructor(
    private route: ActivatedRoute,
    private _practicesService: PracticesService,
  ) { }

  public ngOnInit(): void {
    const id = this.route.snapshot.paramMap.get('id');

    this._practicesService.getPractice(id).subscribe(practice => {
      this.practice = practice;
    });
  }


  public save(): void {
    if (this.score.invalid) { return; }

    this._practicesService.examine(this.practice.id, this.score.value).subscribe(p => this.practice = p);
  }
}
