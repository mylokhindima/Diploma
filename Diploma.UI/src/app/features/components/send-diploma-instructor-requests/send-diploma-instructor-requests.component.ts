import { DiplomaInstructorRequest } from './../../../models/diploma-instructor-request';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-send-diploma-instructor-requests',
  templateUrl: './send-diploma-instructor-requests.component.html',
  styleUrls: ['./send-diploma-instructor-requests.component.scss']
})
export class SendDiplomaInstructorRequestsComponent implements OnInit {

  @Input() public requests: DiplomaInstructorRequest[] = [];

  public panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }

}
