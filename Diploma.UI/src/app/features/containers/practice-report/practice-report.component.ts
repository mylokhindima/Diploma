import { Component, OnInit } from '@angular/core';
import { Practice } from '../../../models/practice';
import { Student } from '../../../models/student';
import { PracticesService } from './../../../services/practices.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';

@Component({
  selector: 'app-practice-report',
  templateUrl: './practice-report.component.html',
  styleUrls: ['./practice-report.component.scss']
})
export class PracticeReportComponent implements OnInit {

  public practice: Practice;

  public readonly student: Student;

  constructor(
    private _practicesService: PracticesService,
    private _profileService: ProfileService,
    private _staticService: StaticService,
  ) { }

  ngOnInit(): void {
    const student = this._profileService.student$.getValue();

    this._practicesService.getStudentPractice(student.id).subscribe(practice => this.practice = practice);
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: File = target.files[0];


      const formData = new FormData();
      formData.append('file', file);

      this._practicesService.uploadPracticeReport(this.practice.id, formData).subscribe(practice => this.practice = practice);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

  public download(): void {
    this._staticService.download('reports/' + this.practice.file.path, this.practice.file.name);
  }

}
