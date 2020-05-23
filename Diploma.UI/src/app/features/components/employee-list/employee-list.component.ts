import { Component, Input, OnInit } from '@angular/core';
import { Professor } from './../../../models/proffesor';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.scss']
})
export class EmployeeListComponent implements OnInit {

  @Input() public dataSource: Professor[] = [];

  @Input() public actionsTemplate;

  displayedColumns: string[] = ['name', 'email', 'degree', 'department', 'roles', 'actions'];
  constructor() { }

  ngOnInit(): void {
  }

}
