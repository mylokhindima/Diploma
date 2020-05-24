import { Component, EventEmitter, Input, Output } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { DiplomaInstructorRequestService } from '../../../services/diploma-instructor-request.service';
import { CommentDialogComponent } from '../comment-dialog/comment-dialog.component';
import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { DiplomaInstructorThemeRequest } from '../../../models/diploma-instructor-theme-request';

@Component({
  selector: 'app-diploma-instructor-requests-container',
  templateUrl: './diploma-instructor-requests-container.component.html',
  styleUrls: ['./diploma-instructor-requests-container.component.scss']
})
export class DiplomaInstructorRequestsContainerComponent {

  @Input() public requests: DiplomaInstructorThemeRequest[] = [];

  @Input() public forCommitee = false;

  @Output() public approved: EventEmitter<DiplomaInstructorRequest> = new EventEmitter<DiplomaInstructorRequest>();
  @Output() public declined: EventEmitter<any> = new EventEmitter<any>();

  public panelOpenState = false;

  constructor(
    private _instructorRequestsService: DiplomaInstructorRequestService,
    private _matDialog: MatDialog,
  ) { }

  public onApproveClick(event: MouseEvent, request: DiplomaInstructorRequest): void {
    event.stopPropagation();

    this.approved.emit(request);
  }

  public onDeclineClick(event: MouseEvent, request: DiplomaInstructorRequest): void {
    event.stopPropagation();

    this._matDialog.open(CommentDialogComponent).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((comment: string) => {
      this.declined.emit({
        request,
        comment
      });
    });
  }
}
