import { Component, OnInit } from '@angular/core';
import { PracticesService } from './../../../services/practices.service';
import { ProfileService } from './../../../services/profile.service';
import { Practice } from '../../../models/practice';

@Component({
  selector: 'app-practice-report-for-student',
  templateUrl: './practice-report-for-student.component.html',
  styleUrls: ['./practice-report-for-student.component.scss']
})
export class PracticeReportForStudentComponent implements OnInit {

  public practice: Practice = null;

  constructor(
    private _practicesService: PracticesService,
    private _profileService: ProfileService
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
}
