import { Student } from './../../../models/student';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-student-list',
  templateUrl: './student-list.component.html',
  styleUrls: ['./student-list.component.scss']
})
export class StudentListComponent implements OnInit {

  @Input() public dataSource: Student[] = [];

  @Input() public actionsTemplate;

  displayedColumns: string[] = ['name', 'email', 'degree', 'group', 'specialty', 'duration', 'educationalForm', 'department', 'actions'];

  constructor() { }

  ngOnInit(): void {
  }

}
