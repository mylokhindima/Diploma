import { ArchievesService } from './services/archieves.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from './services/auth.service';
import { DataService } from './services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(
    private _authService: AuthService,
    private _dataService: DataService,
    private _archivesService: ArchievesService,
  ) {}

  title = 'Diploma';

  ngOnInit(): void {
    if (this._authService.getToken()) {
      this._dataService.loadMyInfo().subscribe();
    }
  }
}
