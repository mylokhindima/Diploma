import { Stage } from './../../../models/stage';
import { Component, OnInit } from '@angular/core';
import { StagesService } from 'src/app/services/stages.service';
import { Step } from 'src/app/models/step.enum';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-deadlines',
  templateUrl: './deadlines.component.html',
  styleUrls: ['./deadlines.component.scss']
})
export class DeadlinesComponent implements OnInit {

  public stages: Stage[] = [];

  constructor(
    private _stagesService: StagesService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._stagesService.getStages().subscribe(stages => {
      this.stages = stages.filter(s => {
        return ![
          Step.MethodologicalMemberThemeChecking,
          Step.PracticeDistribution,
          Step.Normscontrol,
          Step.Plagiarism
        ].includes(s.step);
      }).sort((a, b) => a.step - b.step);
    });
  }

  public save(): void {
    this._stagesService.updateMany(this.stages).subscribe(() => {
      this.toastr.success('Данні збережені', 'Повідомлення!');
    })
  }

  public getMin(index: number): Date {
    for (let i = index - 1; i >= 0; i--) {
      if (this.stages[i].endDate) {
        return this.stages[i].endDate;
      }
    }
  }

  public getMax(index: number): Date {
    for (let i = index + 1; i < this.stages.length; i++) {
      if (this.stages[i].endDate) {
        return this.stages[i].endDate;
      }
    }
  }
}
