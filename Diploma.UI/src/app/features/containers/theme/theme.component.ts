import { Component, OnInit } from '@angular/core';
import { DiplomaInstructorThemeRequest } from './../../../models/diploma-instructor-theme-request';
import { RequestStatus } from './../../../models/request-status.enum';
import { DiplomaInstructorThemeRequestService } from './../../../services/diploma-instructor-theme-request.service';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-theme',
  templateUrl: './theme.component.html',
  styleUrls: ['./theme.component.scss']
})
export class ThemeComponent implements OnInit {

  public diploma$ = this._profileService.diploma$.asObservable();

  public requests: DiplomaInstructorThemeRequest[] = [];

  public showForm = false;

  constructor(
    private _profileService: ProfileService,
    private _requestService: DiplomaInstructorThemeRequestService,
  ) { }

  ngOnInit(): void {
    const student = this._profileService.student$.getValue();

    this._requestService.filterRequests({
      fromId: student.id,
    }).subscribe(requests => {
      this.requests = requests;

      this.showForm = !requests.some(r => r.status === RequestStatus.InReview);
    });
  }

  public onSubmit(value: any) {
    this._requestService.createRequest(value).pipe().subscribe(request => {
      this.requests.unshift(request);
      this.showForm = request.status !== RequestStatus.InReview;
    });
  }

}
