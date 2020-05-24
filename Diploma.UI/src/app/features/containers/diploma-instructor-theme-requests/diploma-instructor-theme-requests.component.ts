import { RequestStatus } from './../../../models/request-status.enum';
import { ProfileService } from './../../../services/profile.service';
import { DiplomaInstructorThemeRequestService } from './../../../services/diploma-instructor-theme-request.service';
import { Component, OnInit } from '@angular/core';
import { DiplomaInstructorThemeRequest } from '../../../models/diploma-instructor-theme-request';

@Component({
  selector: 'app-diploma-instructor-theme-requests',
  templateUrl: './diploma-instructor-theme-requests.component.html',
  styleUrls: ['./diploma-instructor-theme-requests.component.scss']
})
export class DiplomaInstructorThemeRequestsComponent implements OnInit {
  public requests: DiplomaInstructorThemeRequest[] = [];

  public loaded = false;

  constructor(
    private _instructorRequestsService: DiplomaInstructorThemeRequestService,
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    const user = this._profileService.user$.getValue();

    this._instructorRequestsService.filterRequests({
      statuses: [RequestStatus.InReview, RequestStatus.Accepted],
      toId: user.id,
    }).subscribe(requests => {
      this.loaded = true;
      this.requests = requests;
    });
  }

  public onApprove(request): void {
    this._instructorRequestsService.acceptRequestByProfessor(request.id).subscribe(
      () => {
        request.status = RequestStatus.Accepted;
      }
    );
  }

  public onDecline({ request, comment }: { request: DiplomaInstructorThemeRequest, comment: string }): void {
    this._instructorRequestsService.declineRequestByProfessor(request.id, comment).subscribe(
      () => this.requests = this.requests.filter(r => r !== request),
    );
  }
}
