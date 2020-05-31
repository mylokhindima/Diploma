import { ToastrService } from 'ngx-toastr';
import { PracticesService } from './../../../services/practices.service';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Step } from '../../../models/step.enum';
import { ProfileService } from '../../../services/profile.service';
import { Professor } from './../../../models/proffesor';
import { Student } from './../../../models/student';
import { ProfessorsService } from './../../../services/professors.service';
import { StudentsService } from './../../../services/students.service';
import { switchMap, tap } from 'rxjs/operators';
import { BehaviorSubject, forkJoin } from 'rxjs';
import { Practice } from 'src/app/models/practice';

@Component({
  selector: 'app-student-practice-distribution',
  templateUrl: './student-practice-distribution.component.html',
  styleUrls: ['./student-practice-distribution.component.scss']
})
export class StudentPracticeDistributionComponent implements OnInit {

  public students: Student[] = [];
  public professors: Professor[] = [];
  public practices: Practice[] = [];

  public dataSource: [Student, Practice][] = [];

  public isLoad$ = new BehaviorSubject(true);

  public displayedColumns: string[] = ['name', 'educationalProgram', 'group', 'location', 'instructor'];

  constructor(
    private _studentsService: StudentsService,
    private _professorsService: ProfessorsService,
    private _profileService: ProfileService,
    private _practicesService: PracticesService,
    private toastr: ToastrService,
    private _cdr: ChangeDetectorRef,
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

    const practicesLoad$ = this._practicesService.getPractices().pipe(
      tap(practices => this.practices = practices),
    );

    forkJoin(professorLoad$, studentsLoad$, practicesLoad$).subscribe(() => {
      this.isLoad$.next(false);

      const dataSource = [];

      this.students.forEach(s => {
        const practice = this.practices.find(p => p.studentId === s.id);

        dataSource.push([s, practice]);
      });

      this.dataSource = dataSource;

      this._cdr.detectChanges();
    });
  }

  public save(): void {
    this._practicesService.updateMany(this.dataSource.map(([s, p]) => p)).subscribe(practices => {
      this.toastr.success('Данні збережені', 'Повідомлення!');
    });
  }
}
