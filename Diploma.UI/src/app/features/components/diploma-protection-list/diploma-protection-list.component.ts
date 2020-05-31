import { Component, OnInit, Input } from '@angular/core';
import { DiplomaProtection } from '../../../models/diploma-protection';

@Component({
  selector: 'app-diploma-protection-list',
  templateUrl: './diploma-protection-list.component.html',
  styleUrls: ['./diploma-protection-list.component.scss']
})
export class DiplomaProtectionListComponent implements OnInit {

  @Input() public dataSource: DiplomaProtection[] = [];

  displayedColumns: string[] = ['educationalProgram', 'date', 'timeStart', 'timeEnd'];

  constructor() { }

  ngOnInit(): void {
  }
}
