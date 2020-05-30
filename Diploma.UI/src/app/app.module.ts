import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { TokenInterceptor } from './core/token-interceptor';
import { AdminSidebarComponent } from './features/components/admin-sidebar/admin-sidebar.component';
import { DiplomaInstructorRequestFormComponent } from './features/components/diploma-instructor-request-form/diploma-instructor-request-form.component';
import { DiplomaThemeRequestFormComponent } from './features/components/diploma-theme-request-form/diploma-theme-request-form.component';
import { EmployeeListComponent } from './features/components/employee-list/employee-list.component';
import { FooterComponent } from './features/components/footer/footer.component';
import { HeaderComponent } from './features/components/header/header.component';
import { HomeComponent } from './features/components/home/home.component';
import { LoginComponent } from './features/components/login/login.component';
import { PageNotFoundComponent } from './features/components/page-not-found/page-not-found.component';
import { SendDiplomaInstructorRequestsComponent } from './features/components/send-diploma-instructor-requests/send-diploma-instructor-requests.component';
import { SendDiplomaInstructorThemeRequestsComponent } from './features/components/send-diploma-instructor-theme-requests/send-diploma-instructor-theme-requests.component';
import { StudentListComponent } from './features/components/student-list/student-list.component';
import { StudentSidebarComponent } from './features/components/student-sidebar/student-sidebar.component';
import { EmployeeFormComponent } from './features/containers/employee-form/employee-form.component';
import { EmployeesComponent } from './features/containers/employees/employees.component';
import { InstructorComponent } from './features/containers/instructor/instructor.component';
import { StudentFormComponent } from './features/containers/student-form/student-form.component';
import { StudentsComponent } from './features/containers/students/students.component';
import { ThemeComponent } from './features/containers/theme/theme.component';
import { ViewEntityComponent } from './features/containers/view-entity/view-entity.component';
import { MaterialModule } from './material/material.module';
import { DiplomaReportsComponent } from './features/containers/diploma-reports/diploma-reports.component';
import { ViewCommentsComponent } from './features/components/view-comments/view-comments.component';
import { PracticeReportComponent } from './features/containers/practice-report/practice-report.component';
import { DiplomaProtectionComponent } from './features/containers/diploma-protection/diploma-protection.component';
import { DiplomaInstructorRequestsComponent } from './features/containers/diploma-instructor-requests/diploma-instructor-requests.component';
import { ProfessorSidebarComponent } from './features/components/professor-sidebar/professor-sidebar.component';
import { CommentDialogComponent } from './features/components/comment-dialog/comment-dialog.component';
import { DiplomaInstructorThemeRequestsComponent } from './features/containers/diploma-instructor-theme-requests/diploma-instructor-theme-requests.component';
import { DiplomaInstructorRequestsContainerComponent } from './features/components/diploma-instructor-requests-container/diploma-instructor-requests-container.component';
import { MethodologicalCommiteeApproveRequestsComponent } from './features/containers/methodological-commitee-approve-requests/methodological-commitee-approve-requests.component';
import { DiplomaReportsForProfessorComponent } from './features/containers/diploma-reports-for-professor/diploma-reports-for-professor.component';
import { DiplomaReportsContainerComponent } from './features/containers/diploma-reports-container/diploma-reports-container.component';
import { ReportsComponent } from './features/containers/reports/reports.component';
import { EditableCommentComponent } from './features/components/editable-comment/editable-comment.component';
import { ProfessorCapacitiesComponent } from './features/containers/professor-capacities/professor-capacities.component';
import { ToastrModule } from 'ngx-toastr';
import { MethodicalInstructionsComponent } from './features/containers/methodical-instructions/methodical-instructions.component';
import { FormOrdersComponent } from './features/containers/form-orders/form-orders.component';
import { RolesComponent } from './features/containers/roles/roles.component';
import { StudentPracticeDistributionComponent } from './features/containers/student-practice-distribution/student-practice-distribution.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    PageNotFoundComponent,
    AdminSidebarComponent,
    HeaderComponent,
    FooterComponent,
    StudentsComponent,
    StudentListComponent,
    StudentFormComponent,
    EmployeesComponent,
    EmployeeListComponent,
    ViewEntityComponent,
    EmployeeFormComponent,
    StudentSidebarComponent,
    InstructorComponent,
    DiplomaInstructorRequestFormComponent,
    SendDiplomaInstructorRequestsComponent,
    DiplomaThemeRequestFormComponent,
    ThemeComponent,
    SendDiplomaInstructorThemeRequestsComponent,
    DiplomaReportsComponent,
    ViewCommentsComponent,
    PracticeReportComponent,
    DiplomaProtectionComponent,
    DiplomaInstructorRequestsComponent,
    ProfessorSidebarComponent,
    CommentDialogComponent,
    DiplomaInstructorThemeRequestsComponent,
    DiplomaInstructorRequestsContainerComponent,
    MethodologicalCommiteeApproveRequestsComponent,
    DiplomaReportsForProfessorComponent,
    DiplomaReportsContainerComponent,
    ReportsComponent,
    EditableCommentComponent,
    ProfessorCapacitiesComponent,
    MethodicalInstructionsComponent,
    FormOrdersComponent,
    RolesComponent,
    StudentPracticeDistributionComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
    ToastrModule.forRoot(),
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: TokenInterceptor,
      multi: true
    }
  ],
  entryComponents: [
    StudentFormComponent,
    CommentDialogComponent,
    ViewCommentsComponent,
    EditableCommentComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
