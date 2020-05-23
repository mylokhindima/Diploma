import { Component, Input, OnInit } from '@angular/core';
import { DiplomaInstructorThemeRequest } from './../../../models/diploma-instructor-theme-request';

@Component({
  selector: 'app-send-diploma-instructor-theme-requests',
  templateUrl: './send-diploma-instructor-theme-requests.component.html',
  styleUrls: ['./send-diploma-instructor-theme-requests.component.scss']
})
export class SendDiplomaInstructorThemeRequestsComponent implements OnInit {

  @Input() public requests: DiplomaInstructorThemeRequest[] = [];

  public panelOpenState = false;

  constructor() { }

  ngOnInit(): void {
  }


}
