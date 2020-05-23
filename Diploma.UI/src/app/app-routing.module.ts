import { DiplomaProtectionComponent } from './features/containers/diploma-protection/diploma-protection.component';
import { InstructorComponent } from './features/containers/instructor/instructor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guards/auth.guard';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './features/components/login/login.component';
import { PageNotFoundComponent } from './features/components/page-not-found/page-not-found.component';
import { EmployeesComponent } from './features/containers/employees/employees.component';
import { StudentsComponent } from './features/containers/students/students.component';
import { AdminGuard } from './core/guards/admin.guard';
import { StudentGuard } from './core/guards/student.guard';
import { ThemeComponent } from './features/containers/theme/theme.component';
import { DiplomaReportsComponent } from './features/containers/diploma-reports/diploma-reports.component';
import { PracticeReportComponent } from './features/containers/practice-report/practice-report.component';
import { ProfessorGuard } from './core/guards/professor.guard';
import { DiplomaInstructorRequestsComponent } from './features/containers/diploma-instructor-requests/diploma-instructor-requests.component';


const routes: Routes = [
  {
    path: '',
    component: HomeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        pathMatch: 'full',
        redirectTo: 'students'
      },
      {
        path: 'students',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: StudentsComponent,
      },
      {
        path: 'employees',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: EmployeesComponent,
      },
      {
        path: 'instructor',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: InstructorComponent,
      },
      {
        path: 'theme',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: ThemeComponent,
      },
      {
        path: 'diploma-parts',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: DiplomaReportsComponent,
      },
      {
        path: 'practice-report',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: PracticeReportComponent
      },
      {
        path: 'diploma-protection',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: DiplomaProtectionComponent
      },
      {
        path: 'instructor-requests',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomaInstructorRequestsComponent,
      },
    ]
  },
  {
    path: 'sign-in',
    pathMatch: 'full',
    component: LoginComponent,
  },
  {
    path: '**',
    pathMatch: 'full',
    component: PageNotFoundComponent,
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
