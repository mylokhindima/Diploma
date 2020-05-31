import { Router } from '@angular/router';
import { OrdersService } from './../../../services/orders.service';
import { Component, OnInit } from '@angular/core';
import { EducationalProgram } from './../../../models/educational-program';
import { EducationalProgramService } from './../../../services/educational-program.service';
import { ProfileService } from './../../../services/profile.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { OrderType } from '../../../models/order-type.enum';

@Component({
  selector: 'app-form-orders',
  templateUrl: './form-orders.component.html',
  styleUrls: ['./form-orders.component.scss']
})
export class FormOrdersComponent implements OnInit {

  public programs: EducationalProgram[] = [];

  public get minStartDate(): Date {
    return new Date();
  }

  public get minEndDate(): Date {
    const value = this.form.get('startDate').value;

    const res = new Date(value || new Date());

    res.setDate(res.getDate() + 1);

    return res;
  }

  public readonly form = new FormGroup({
    startDate: new FormControl(null, [Validators.required]),
    endDate: new FormControl(null, [Validators.required]),
    educationalProgramId: new FormControl(null, [Validators.required]),
  });

  constructor(
    private educationalPrograms: EducationalProgramService,
    private _profileService: ProfileService,
    private _ordersService: OrdersService,
    private _router: Router,
  ) { }

  ngOnInit(): void {
    const professor = this._profileService.professor$.getValue();
    this.educationalPrograms.filter({
      departmentId: professor.departmentId
    }).subscribe(programs => this.programs = programs);
  }

  public createDiplomaOrder(): void {
    this._ordersService.create({
      ...this.form.value,
      type: OrderType.Diploma
    }).subscribe(() => this._router.navigateByUrl('/materials'));
  }

  public createPracticeOrder(): void {
    this._router.navigateByUrl('/materials');
    this._ordersService.create({
      ...this.form.value,
      type: OrderType.Practice
    }).subscribe(() => this._router.navigateByUrl('/materials'));
  }

}
