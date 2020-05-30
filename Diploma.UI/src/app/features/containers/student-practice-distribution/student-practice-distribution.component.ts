import { Component, OnInit } from '@angular/core';
import { StudentsService } from './../../../services/students.service';

@Component({
  selector: 'app-student-practice-distribution',
  templateUrl: './student-practice-distribution.component.html',
  styleUrls: ['./student-practice-distribution.component.scss']
})
export class StudentPracticeDistributionComponent implements OnInit {

  constructor(
    private _studentsService: StudentsService,
  ) { }

  public ngOnInit(): void {
    // this._studentsService.
  }

}
