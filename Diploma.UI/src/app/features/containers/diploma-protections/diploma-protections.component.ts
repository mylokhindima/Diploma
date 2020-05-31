import { filter } from 'rxjs/operators';
import { CreateDiplomaProtectionComponent } from './../../components/create-diploma-protection/create-diploma-protection.component';
import { DiplomaProtectionsService } from './../../../services/diploma-protections.service';
import { Component, OnInit } from '@angular/core';
import { DiplomaProtection } from '../../../models/diploma-protection';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-diploma-protections',
  templateUrl: './diploma-protections.component.html',
  styleUrls: ['./diploma-protections.component.scss']
})
export class DiplomaProtectionsComponent implements OnInit {

  public protections: DiplomaProtection[] = [];

  constructor(
    private _diplomaProtectionsService: DiplomaProtectionsService,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._diplomaProtectionsService.getDiplomaProtections().subscribe(protections => {
      this.protections = protections;
    });
  }

  public addProtection(): void {
    this._matDialog.open(CreateDiplomaProtectionComponent).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((p: DiplomaProtection) => this.protections = [p, ...this.protections]);
  }

}
