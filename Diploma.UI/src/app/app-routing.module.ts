import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminGuard } from './core/guards/admin.guard';
import { AuthGuard } from './core/guards/auth.guard';
import { ProfessorGuard } from './core/guards/professor.guard';
import { StudentGuard } from './core/guards/student.guard';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './features/components/login/login.component';
import { PageNotFoundComponent } from './features/components/page-not-found/page-not-found.component';
import { ArchieveComponent } from './features/containers/archieve/archieve.component';
import { ArchievesComponent } from './features/containers/archieves/archieves.component';
import { DeadlinesComponent } from './features/containers/deadlines/deadlines.component';
import { DepartmentsComponent } from './features/containers/departments/departments.component';
import { DiplomaInstructorRequestsComponent } from './features/containers/diploma-instructor-requests/diploma-instructor-requests.component';
import { DiplomaInstructorThemeRequestsComponent } from './features/containers/diploma-instructor-theme-requests/diploma-instructor-theme-requests.component';
import { DiplomaMainReportComponent } from './features/containers/diploma-main-report/diploma-main-report.component';
import { DiplomaProtectionComponent } from './features/containers/diploma-protection/diploma-protection.component';
import { DiplomaProtectionsComponent } from './features/containers/diploma-protections/diploma-protections.component';
import { DiplomaRecordComponent } from './features/containers/diploma-record/diploma-record.component';
import { DiplomaReportsContainerComponent } from './features/containers/diploma-reports-container/diploma-reports-container.component';
import { DiplomaReportsForProfessorComponent } from './features/containers/diploma-reports-for-professor/diploma-reports-for-professor.component';
import { DiplomaReportsComponent } from './features/containers/diploma-reports/diploma-reports.component';
import { DiplomasComponent } from './features/containers/diplomas/diplomas.component';
import { EmployeesComponent } from './features/containers/employees/employees.component';
import { FormOrdersComponent } from './features/containers/form-orders/form-orders.component';
import { InstructorComponent } from './features/containers/instructor/instructor.component';
import { MethodicalInstructionsComponent } from './features/containers/methodical-instructions/methodical-instructions.component';
import { MethodologicalCommiteeApproveRequestsComponent } from './features/containers/methodological-commitee-approve-requests/methodological-commitee-approve-requests.component';
import { NormscontrolComponent } from './features/containers/normscontrol/normscontrol.component';
import { PlagiarismComponent } from './features/containers/plagiarism/plagiarism.component';
import { PracticeReportForExamineComponent } from './features/containers/practice-report-for-examine/practice-report-for-examine.component';
import { PracticeReportForStudentComponent } from './features/containers/practice-report-for-student/practice-report-for-student.component';
import { PracticeReportsForExamineComponent } from './features/containers/practice-reports-for-examine/practice-reports-for-examine.component';
import { ProfessorCapacitiesComponent } from './features/containers/professor-capacities/professor-capacities.component';
import { RolesComponent } from './features/containers/roles/roles.component';
import { StudentPracticeDistributionComponent } from './features/containers/student-practice-distribution/student-practice-distribution.component';
import { StudentsInfoComponent } from './features/containers/students-info/students-info.component';
import { StudentsComponent } from './features/containers/students/students.component';
import { ThemeComponent } from './features/containers/theme/theme.component';


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
        path: 'structure',
        pathMatch: 'full',
        canActivate: [AdminGuard],
        component: DepartmentsComponent,
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
        component: PracticeReportForStudentComponent,
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
        canActivate: [AuthGuard],
        component: MethodicalInstructionsComponent
      },
      {
        path: 'form-orders',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: FormOrdersComponent,
      },
      {
        path: 'practice-distribution',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: StudentPracticeDistributionComponent,
      },
      {
        path: 'practice-examination',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: PracticeReportsForExamineComponent,
      },
      {
        path: 'practice-examination/:id',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: PracticeReportForExamineComponent,
      },
      {
        path: 'roles',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: RolesComponent
      },
      {
        path: 'deadlines',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DeadlinesComponent
      },
      {
        path: 'diploma-protections',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomaProtectionsComponent
      },
      {
        path: 'diploma-record',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: DiplomaRecordComponent,
      },
      {
        path: 'main-report',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: DiplomaMainReportComponent,
      },
      {
        path: 'diplomas',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: DiplomasComponent,
      },
      {
        path: 'plagiarism',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: PlagiarismComponent,
      },
      {
        path: 'normscontrol',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: NormscontrolComponent,
      },
      {
        path: 'archieve',
        pathMatch: 'full',
        canActivate: [StudentGuard],
        component: ArchieveComponent,
      },
      {
        path: 'archieves',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: ArchievesComponent,
      },
      {
        path: 'diplomas-info',
        pathMatch: 'full',
        canActivate: [ProfessorGuard],
        component: StudentsInfoComponent,
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
