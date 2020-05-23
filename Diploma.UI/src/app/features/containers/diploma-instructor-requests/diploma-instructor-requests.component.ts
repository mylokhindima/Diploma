import { filter, switchMap } from 'rxjs/operators';
import { CommentDialogComponent } from './../../components/comment-dialog/comment-dialog.component';
import { ProfileService } from './../../../services/profile.service';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { Component, OnInit, Input } from '@angular/core';
import { DiplomaInstructorRequestService } from '../../../services/diploma-instructor-request.service';
import { RequestStatus } from '../../../models/request-status.enum';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-diploma-instructor-requests',
  templateUrl: './diploma-instructor-requests.component.html',
  styleUrls: ['./diploma-instructor-requests.component.scss']
})
export class DiplomaInstructorRequestsComponent implements OnInit {

  public requests: DiplomaInstructorRequest[] = [];

  public panelOpenState = false;

  public loaded = false;

  constructor(
    private _instructorRequestsService: DiplomaInstructorRequestService,
    private _profileService: ProfileService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    const user = this._profileService.user$.getValue();

    this._instructorRequestsService.filterRequests({
      status: RequestStatus.InReview,
      toId: user.id,
    }).subscribe(requests => {
      this.loaded = true;
      this.requests = requests;
    });
  }

  public onApproveClick(event: MouseEvent, request: DiplomaInstructorRequest): void {
    event.stopPropagation();

    this._instructorRequestsService.acceptRequest(request.id).subscribe(
      () => this.requests = this.requests.filter(r => r !== request)
    );
  }

  public onDeclineClick(event: MouseEvent, request: DiplomaInstructorRequest): void {
    event.stopPropagation();

    this._matDialog.open(CommentDialogComponent).afterClosed().pipe(
      filter(Boolean),
      switchMap((text: string) => this._instructorRequestsService.declineRequest(request.id, text))
    ).subscribe(
      () => this.requests = this.requests.filter(r => r !== request)
    );
  }

}
