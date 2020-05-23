import { Component, OnInit } from '@angular/core';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { Professor } from './../../../models/proffesor';
import { DiplomaInstructorRequestService } from './../../../services/diploma-instructor-request.service';
import { ProfessorsService } from './../../../services/professors.service';
import { ProfileService } from './../../../services/profile.service';
import { RequestStatus } from '../../../models/request-status.enum';

@Component({
  selector: 'app-instructor',
  templateUrl: './instructor.component.html',
  styleUrls: ['./instructor.component.scss']
})
export class InstructorComponent implements OnInit {

  public diploma$ = this._profileService.diploma$.asObservable();

  public requests: DiplomaInstructorRequest[] = [];

  public professors: Professor[] = [];

  public showForm = false;

  constructor(
    private _professorsService: ProfessorsService,
    private _diplomaInstructorRequestService: DiplomaInstructorRequestService,
    private _profileService: ProfileService
  ) { }

  ngOnInit(): void {
    const student = this._profileService.student$.getValue();

    this._diplomaInstructorRequestService.filterRequests({
      fromId: student.id,
    }).subscribe(requests => {
      this.requests = requests;

      this.showForm = !requests.some(r => r.status === RequestStatus.InReview);
    });

    this._professorsService.filterByQuery({
      departmentId: student.departmentId,
      isActive: true,
    }).subscribe(professors => {
      this.professors = professors;
    });
  }

  public onSubmit(value: any) {
    this._diplomaInstructorRequestService.createRequest(value).pipe().subscribe(request => {
      this.requests.unshift(request);
      this.showForm = request.status !== RequestStatus.InReview;
    });
  }

}
