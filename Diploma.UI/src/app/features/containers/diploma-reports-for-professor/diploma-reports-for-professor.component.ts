import { Diploma } from './../../../models/diploma';
import { ProfileService } from './../../../services/profile.service';
import { DiplomasService } from './../../../services/diplomas.service';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-diploma-reports-for-professor',
  templateUrl: './diploma-reports-for-professor.component.html',
  styleUrls: ['./diploma-reports-for-professor.component.scss']
})
export class DiplomaReportsForProfessorComponent implements OnInit {

  public diplomas: Diploma[] = [];

  constructor(
    private _diplomasService: DiplomasService,
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    const user = this._profileService.user$.getValue();

    this._diplomasService.filterDiplomas({
      instructorId: user.id,
    }).subscribe((diplomas: Diploma[])  => {
      this.diplomas = diplomas;
    });
  }

}
