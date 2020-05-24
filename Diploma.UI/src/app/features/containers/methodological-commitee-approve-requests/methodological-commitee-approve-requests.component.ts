import { Component, OnInit } from '@angular/core';
import { DiplomaInstructorThemeRequest } from './../../../models/diploma-instructor-theme-request';
import { RequestStatus } from './../../../models/request-status.enum';
import { DiplomaInstructorThemeRequestService } from './../../../services/diploma-instructor-theme-request.service';

@Component({
  selector: 'app-methodological-commitee-approve-requests',
  templateUrl: './methodological-commitee-approve-requests.component.html',
  styleUrls: ['./methodological-commitee-approve-requests.component.scss']
})
export class MethodologicalCommiteeApproveRequestsComponent implements OnInit {

  public requests: DiplomaInstructorThemeRequest[] = [];

  public loaded = false;

  constructor(
    private _instructorRequestsService: DiplomaInstructorThemeRequestService,
  ) { }

  ngOnInit(): void {
    this._instructorRequestsService.filterRequests({
      statuses: [RequestStatus.Accepted],
    }).subscribe(requests => {
      this.loaded = true;
      this.requests = requests;
    });
  }

  public onApprove(request: DiplomaInstructorThemeRequest): void {
    this._instructorRequestsService.acceptRequestByMethodologicalCommitee(request.id).subscribe(
      () => {
        request.methodologicalCommissionApprove = true;
      }
    );
  }

  public onDecline({ request, comment }: { request: DiplomaInstructorThemeRequest, comment: string }): void {
    this._instructorRequestsService.declineRequestByProfessor(request.id, comment).subscribe(
      () => this.requests = this.requests.filter(r => r !== request),
    );
  }

}
