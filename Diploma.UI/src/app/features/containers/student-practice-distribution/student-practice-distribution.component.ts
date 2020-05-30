import { Component, OnInit } from '@angular/core';
import { Step } from '../../../models/step.enum';
import { ProfileService } from '../../../services/profile.service';
import { Professor } from './../../../models/proffesor';
import { Student } from './../../../models/student';
import { ProfessorsService } from './../../../services/professors.service';
import { StudentsService } from './../../../services/students.service';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';

@Component({
  selector: 'app-student-practice-distribution',
  templateUrl: './student-practice-distribution.component.html',
  styleUrls: ['./student-practice-distribution.component.scss']
})
export class StudentPracticeDistributionComponent implements OnInit {

  public students: Student[] = [];
  public professors: Professor[] = [];

  public isLoad$ = new BehaviorSubject(true);

  public displayedColumns: string[] = ['name', 'educationalProgram', 'group', 'location', 'instructor'];

  constructor(
    private _studentsService: StudentsService,
    private _professorsService: ProfessorsService,
    private _profileService: ProfileService,
  ) { }

  public ngOnInit(): void {
    const professor = this._profileService.professor$.getValue();

    const professorLoad$ = this._professorsService.filterByQuery({
      isActive: true,
      departmentId: professor.departmentId,
    }).pipe(
      tap(professors => this.professors = professors),
    );

    const studentsLoad$ = this._studentsService.filter({
      departmentId: professor.departmentId,
      step: Step.PracticeDistribution,
      isActive: true,
    }).pipe(
      tap(students => this.students = students),
    );

    forkJoin(professorLoad$, studentsLoad$).subscribe(() => this.isLoad$.next(false));
  }

}
