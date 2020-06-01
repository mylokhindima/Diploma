import { Order } from './../../../models/order';
import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable, forkJoin } from 'rxjs';
import { switchMap } from 'rxjs/operators';
import { File } from '../../../models/file';
import { DepartmentMember } from './../../../models/department-member';
import { FileType } from './../../../models/file-type.enum';
import { Role } from './../../../models/role.enum';
import { FilesService } from './../../../services/files.service';
import { OrdersService } from './../../../services/orders.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';

@Component({
  selector: 'app-methodical-instructions',
  templateUrl: './methodical-instructions.component.html',
  styleUrls: ['./methodical-instructions.component.scss']
})
export class MethodicalInstructionsComponent implements OnInit {

  public files: File[] = [];
  public orders: Order[] = [];

  public get isResponsibleForGraduation(): boolean {
    const professor = this._profileService.user$.getValue();

    return professor.roles.some(r => r === Role.ResponsibleForGraduation);
  }

  public get isHeadOfDepartment(): boolean {
    return this._profileService.professor$.getValue().roles.includes(Role.HeadOfDepartment);
  }

  constructor(
    private _filesService: FilesService,
    private _ordersService: OrdersService,
    private _staticService: StaticService,
    private _profileService: ProfileService,
    private _cdr: ChangeDetectorRef,
  ) { }

  ngOnInit(): void {
    const departmentMember: DepartmentMember = this._profileService.professor$.getValue() || this._profileService.student$.getValue();

    const loadOrders$ = this._ordersService.filter(departmentMember.departmentId);

    const loadFiles$ = this._filesService.filter({
      types: [FileType.MethodicalInstructions],
    });

    forkJoin(loadOrders$, loadFiles$).subscribe(([orders, files]) => {
      this.orders = orders;
      this.files = files;
    });
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: any = target.files[0];

      const formData = new FormData();
      formData.append('file', file);
      formData.set('type', FileType.MethodicalInstructions.toString());

      this._filesService.create(formData).subscribe(file => this.files.unshift(file));
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }

  public download(file: File): void {
    switch (file.type) {
      case FileType.GraduationOrder:
      case FileType.PracticeOrder:
        this._staticService.download('orders/' + file.path, file.name);
        break;
      default:
        this._staticService.download('files/' + file.path, file.name);
    }
  }

  public removeOrder(order: Order): void {
    this._ordersService.remove(order.id).subscribe(() => {
      this.orders = this.orders.filter(o => o.id !== order.id);
    });
  }

  public removeFile(file: File): void {
    this._filesService.remove(file.id).subscribe(() => {
      this.files = this.files.filter(f => f.id !== file.id);
    });
  }

  public approve(order: Order): void {
    this._ordersService.approve(order.id).subscribe(approvedOrder => {
      const index = this.orders.findIndex(o => o.id === approvedOrder.id);

      this.orders[index] = approvedOrder;
debugger;
      this._cdr.detectChanges();
    });
  }
}
