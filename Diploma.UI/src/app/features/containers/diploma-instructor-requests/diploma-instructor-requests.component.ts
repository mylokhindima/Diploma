import { Component, OnInit } from '@angular/core';
import { RequestStatus } from '../../../models/request-status.enum';
import { DiplomaInstructorRequestService } from '../../../services/diploma-instructor-request.service';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { ProfileService } from './../../../services/profile.service';

@Component({
  selector: 'app-diploma-instructor-requests',
  templateUrl: './diploma-instructor-requests.component.html',
  styleUrls: ['./diploma-instructor-requests.component.scss']
})
export class DiplomaInstructorRequestsComponent implements OnInit {

  public requests: DiplomaInstructorRequest[] = [];

  public loaded = false;

  constructor(
    private _instructorRequestsService: DiplomaInstructorRequestService,
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

  public onApprove(request: DiplomaInstructorRequest): void {
    this._instructorRequestsService.acceptRequest(request.id).subscribe(
      () => {
        request.status = RequestStatus.Accepted;
      }
    );
  }

  public onDecline({ request, comment }: { request: DiplomaInstructorRequest, comment: string }): void {
    this._instructorRequestsService.declineRequest(request.id, comment).subscribe(
      () => this.requests = this.requests.filter(r => r !== request),
    );
  }

}
