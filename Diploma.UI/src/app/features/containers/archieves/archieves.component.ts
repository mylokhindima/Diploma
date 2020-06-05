import { Archieve } from './../../../models/archieve';
import { ArchievesService } from './../../../services/archieves.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-archieves',
  templateUrl: './archieves.component.html',
  styleUrls: ['./archieves.component.scss']
})
export class ArchievesComponent implements OnInit {

  public archieves: Archieve[] = [];

  constructor(
    private _archievesService: ArchievesService,
  ) { }

  ngOnInit(): void {
    this._archievesService.getAll().subscribe(archieves => this.archieves = archieves);
  }

  public generate(archieve: Archieve): void {
    this._archievesService.generate(archieve.id, `${archieve.diploma.student.name}-${archieve.diploma.student.group}` );
  }

}
