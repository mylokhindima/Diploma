import { ProfessorCapacitiesComponent } from './features/containers/professor-capacities/professor-capacities.component';
import { DiplomaReportsContainerComponent } from './features/containers/diploma-reports-container/diploma-reports-container.component';
import { DiplomaReportsForProfessorComponent } from './features/containers/diploma-reports-for-professor/diploma-reports-for-professor.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfessorGuard } from './core/guards/professor.guard';
import { StudentGuard } from './core/guards/student.guard';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './features/components/login/login.component';
import { MethodologicalCommiteeApproveRequestsComponent } from './features/containers/methodological-commitee-approve-requests/methodological-commitee-approve-requests.component';
import { PageNotFoundComponent } from './features/components/page-not-found/page-not-found.component';
import { DiplomaInstructorRequestsComponent } from './features/containers/diploma-instructor-requests/diploma-instructor-requests.component';
import { DiplomaInstructorThemeRequestsComponent } from './features/containers/diploma-instructor-theme-requests/diploma-instructor-theme-requests.component';
import { DiplomaProtectionComponent } from './features/containers/diploma-protection/diploma-protection.component';
import { DiplomaReportsComponent } from './features/containers/diploma-reports/diploma-reports.component';
import { EmployeesComponent } from './features/containers/employees/employees.component';
import { InstructorComponent } from './features/containers/instructor/instructor.component';
import { PracticeReportComponent } from './features/containers/practice-report/practice-report.component';
import { StudentsComponent } from './features/containers/students/students.component';
import { ThemeComponent } from './features/containers/theme/theme.component';
import { MethodicalInstructionsComponent } from './features/containers/methodical-instructions/methodical-instructions.component';


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
      {
        path: 'instructor-theme-requests',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomaInstructorThemeRequestsComponent,
      },
      {
        path: 'methodological-commitee-approve',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: MethodologicalCommiteeApproveRequestsComponent,
      },
      {
        path: 'diploma-reports',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomaReportsForProfessorComponent,
      },
      {
        path: 'diploma-reports/:id',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomaReportsContainerComponent,
      },
      {
        path: 'capacities',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: ProfessorCapacitiesComponent,
      },
      {
        path: 'materials',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: MethodicalInstructionsComponent
      }
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
