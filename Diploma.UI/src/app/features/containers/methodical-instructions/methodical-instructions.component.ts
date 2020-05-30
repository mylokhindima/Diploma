import { Observable } from 'rxjs';
import { OrdersService } from './../../../services/orders.service';
import { Role } from './../../../models/role.enum';
import { ProfileService } from './../../../services/profile.service';
import { Component, OnInit } from '@angular/core';
import { File } from '../../../models/file';
import { FileType } from './../../../models/file-type.enum';
import { FilesService } from './../../../services/files.service';
import { StaticService } from './../../../services/static.service';
import { switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-methodical-instructions',
  templateUrl: './methodical-instructions.component.html',
  styleUrls: ['./methodical-instructions.component.scss']
})
export class MethodicalInstructionsComponent implements OnInit {

  public files: File[] = [];

  public get isResponsibleForGraduation(): boolean {
    const professor = this._profileService.user$.getValue();

    return professor.roles.some(r => r === Role.ResponsibleForGraduation);
  }

  constructor(
    private _filesService: FilesService,
    private _ordersService: OrdersService,
    private _staticService: StaticService,
    private _profileService: ProfileService,
  ) { }

  ngOnInit(): void {
    this._filesService.filter({
      types: [FileType.MethodicalInstructions, FileType.PracticeOrder, FileType.GraduationOrder]
    }).subscribe(files => {
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

  public remove(file: File): void {
    let action$: Observable<void>;

    switch (file.type) {
      case FileType.GraduationOrder:
      case FileType.PracticeOrder:
        action$ = this._ordersService.findByFileId(file.id).pipe(
          switchMap(o => this._ordersService.remove(o.id))
        );
        break;
      default:
        action$ = this._filesService.remove(file.id);
    }

    action$.subscribe(() => this.files = this.files.filter(f => f.id !== file.id));

  }
}