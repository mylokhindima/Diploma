import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subject } from 'rxjs';
import { filter, takeUntil } from 'rxjs/operators';
import { Diploma } from '../../../models/diploma';
import { ProfileService } from '../../../services/profile.service';
import { Step } from './../../../models/step.enum';

@Component({
  selector: 'app-student-sidebar',
  templateUrl: './student-sidebar.component.html',
  styleUrls: ['./student-sidebar.component.scss']
})
export class StudentSidebarComponent implements OnInit, OnDestroy {

  public diploma$ = this._profileService.diploma$.asObservable();

  public step = Step.ChooseInstructor;

  private destroy$ = new Subject<void>();

  constructor(private _profileService: ProfileService) { }


  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }

  ngOnInit(): void {
    this.diploma$.pipe(takeUntil(this.destroy$), filter(Boolean)).subscribe((diploma: Diploma) => {
      this.step = diploma.stage.step;
    });
  }

}
