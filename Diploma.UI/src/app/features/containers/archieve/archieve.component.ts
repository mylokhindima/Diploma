import { FileType } from './../../../models/file-type.enum';
import { File } from './../../../models/file';
import { Component, OnInit } from '@angular/core';
import { Archieve } from './../../../models/archieve';
import { ArchievesService } from './../../../services/archieves.service';
import { ProfileService } from './../../../services/profile.service';
import { StaticService } from './../../../services/static.service';

@Component({
  selector: 'app-archieve',
  templateUrl: './archieve.component.html',
  styleUrls: ['./archieve.component.scss']
})
export class ArchieveComponent implements OnInit {

  public archieve: Archieve = null;

  constructor(
    private _archievesService: ArchievesService,
    private _profileService: ProfileService,
    private _staticService: StaticService,
  ) { }

  ngOnInit(): void {
    const diploma = this._profileService.diploma$.getValue();

    this._archievesService.getArchieveByDiplomaId(diploma.id).subscribe(archieve => {
      this.archieve = archieve;
    });
  }

  public onExcelChange($event) {
    const target = $event.target;

    if (target.files.length) {
      const file: any = target.files[0];

      const formData = new FormData();
      formData.append('file', file);
      formData.set('type', FileType.Presentation.toString());
      formData.set('id', this.archieve.id);

      this._archievesService.uploadReport(formData).subscribe(archieve => this.archieve = archieve);
    }

    (document.getElementById('input_file') as HTMLInputElement).value = '';
  }


  public download(file: File): void {
    this._staticService.download('files/' + file.path, file.name);
  }

}
