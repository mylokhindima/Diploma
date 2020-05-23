import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-view-entity',
  templateUrl: './view-entity.component.html',
  styleUrls: ['./view-entity.component.scss']
})
export class ViewEntityComponent implements OnInit {

  @Output() public add: EventEmitter<void> = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

}
