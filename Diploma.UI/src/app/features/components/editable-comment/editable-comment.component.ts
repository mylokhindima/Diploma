import { Component, OnInit, AfterViewInit } from '@angular/core';
import * as Quill from 'quill';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-editable-comment',
  templateUrl: './editable-comment.component.html',
  styleUrls: ['./editable-comment.component.scss']
})
export class EditableCommentComponent implements OnInit, AfterViewInit {

  constructor(private _ref: MatDialogRef<any>) { }

  ngOnInit(): void {
  }


  public ok(): void {
    const text = document.querySelector('.ql-editor').innerHTML;

    this._ref.close(text);
  }

  public close(): void {
    this._ref.close();
  }
  ngAfterViewInit(): void {
    new Quill('#editor', {
      modules: {
        toolbar: {
          container: '#toolbar',
        }
      },
      theme: 'snow'
    });
  }
}
