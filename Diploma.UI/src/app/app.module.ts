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
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpClientModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    MaterialModule,
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
    ViewCommentsComponent
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  bootstrap: [AppComponent]
})
export class AppModule { }
