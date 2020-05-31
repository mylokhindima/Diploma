import { EducationalProgram } from './../../../models/educational-program';
import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { filter } from 'rxjs/operators';
import { Department } from '../../../models/department';
import { Specialty } from './../../../models/specialty';
import { DepartmentsService } from './../../../services/departments.service';
import { CreateDepartmentComponent } from './../../components/create-department/create-department.component';
import { CreateSpecialtyComponent } from './../../components/create-specialty/create-specialty.component';
import { CreateEducationalProgramComponent } from '../../components/create-educational-program/create-educational-program.component';

@Component({
  selector: 'app-departments',
  templateUrl: './departments.component.html',
  styleUrls: ['./departments.component.scss']
})
export class DepartmentsComponent implements OnInit {

  public dataSource: any = [];

  constructor(
    private _departmentsService: DepartmentsService,
    private _cdr: ChangeDetectorRef,
    private _matDialog: MatDialog,
  ) { }

  ngOnInit(): void {
    this._departmentsService.getDepartments().subscribe(departments => {
      this.dataSource = departments.map((d, di) => ({
        ...d,
        index: di,
        type: 0,
        children: d.specialties.map((s, si) => ({
          ...s,
          index: si,
          type: 1,
          children: s.educationalPrograms.map((p, pi) => ({
            index: pi,
            ...p,
            type: 2,
          })),
        }))
      })) as any;
    });
  }

  public onAdd(node: any): void {
    switch (node.type) {
      case 0:
        this.addSpecialty(node);
        break;
      case 1:
        this.addEdProgram(node);
        break;
      default:
    }
  }

  public addSpecialty(node: any): void {
    this._matDialog.open(CreateSpecialtyComponent, {
      data: {
        departmentId: node.id,
      }
    }).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((specialty: Specialty) => {
      node.specialties ? node.specialties.push(specialty) : node.specialties = [];
      node.children = [...node.children, {
        ...specialty,
        index: node.children.length,
        type: 1,
        children: [],
      }];

      this.dataSource = JSON.parse(JSON.stringify([...this.dataSource]));

      this._cdr.detectChanges();
    });

  }

  public addEdProgram(node: any): void {

    this._matDialog.open(CreateEducationalProgramComponent, {
      data: {
        specialtyId: node.id,
      }
    }).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((program: EducationalProgram) => {
      node.educationalPrograms ? node.educationalPrograms.push(program) : node.educationalPrograms = [];
      node.children = [...node.children, {
        ...program,
        index: node.children.length,
        type: 2,
      }];

      this.dataSource = JSON.parse(JSON.stringify([...this.dataSource]));

      this._cdr.detectChanges();
    });
  }

  public addDepartment(): void {
    this._matDialog.open(CreateDepartmentComponent).afterClosed().pipe(
      filter(Boolean),
    ).subscribe((department: Department) => {
      this.dataSource = [...this.dataSource, {
        ...department,
        type: 0,
        index: this.dataSource.length,
        children: [],
      }];
    });
  }

}


