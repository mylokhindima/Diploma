import {NestedTreeControl} from '@angular/cdk/tree';
import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import {MatTreeNestedDataSource} from '@angular/material/tree';

@Component({
  selector: 'app-department-list',
  templateUrl: './department-list.component.html',
  styleUrls: ['./department-list.component.scss']
})
export class DepartmentListComponent implements OnInit {
  treeControl = new NestedTreeControl<any>(node => node.children);
  @Input() dataSource = new MatTreeNestedDataSource<any>();

  @Output() add: EventEmitter<any> = new EventEmitter<any>();
  @Output() addResponsible: EventEmitter<any> = new EventEmitter<any>();

  constructor(
  ) {
  }

  public ngOnInit(): void {
  }

  hasChild = (_: number, node: any) => !!node.children && node.children.length > 0;

}
