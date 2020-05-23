import { MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-comment-dialog',
  templateUrl: './comment-dialog.component.html',
  styleUrls: ['./comment-dialog.component.scss']
})
export class CommentDialogComponent implements OnInit {

  public text = '';

  constructor(private _ref: MatDialogRef<any>) { }

  ngOnInit(): void {
  }

  public ok(): void {
    this._ref.close(this.text);
  }

  public close(): void {
    this._ref.close();
  }
}
