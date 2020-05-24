import { Component, OnInit } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Professor } from '../../../models/proffesor';
import { ProfessorsService } from './../../../services/professors.service';

@Component({
  selector: 'app-professor-capacities',
  templateUrl: './professor-capacities.component.html',
  styleUrls: ['./professor-capacities.component.scss']
})
export class ProfessorCapacitiesComponent implements OnInit {

  public professors: Professor[] = [];

  constructor(
    private _professorService: ProfessorsService,
    private toastr: ToastrService
  ) { }

  ngOnInit(): void {
    this._professorService.getProfessors().subscribe(professors => this.professors = professors);
  }

  public save(): void {
    const dtos = this.professors.map(p => ({ professorId: p.id, capacity: p.capacity }));
    this._professorService.updateCapacities(dtos).subscribe(() => {
      this.toastr.success('Данні збережені', 'Повідомлення!');
    });
  }

}
