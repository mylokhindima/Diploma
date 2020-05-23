import { OrdersModule } from './features/+orders/orders.module';
import { FilesModule } from './features/+files/files.module';
import { MulterModule } from '@nestjs/platform-express';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { ScheduleModule } from '@nestjs/schedule';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './features/+auth/auth.module';
import { DepartmentsModule } from './features/+departments/department.module';
import { DiplomaInstructorRequestsModule } from './features/+diploma-instructor-requests/diploma-instructor-requests.module';
import { EducationalProgramsModule } from './features/+educational-program/educational-programs.module';
import { ProfessorsModule } from './features/+professors/professors.module';
import { SpecialtiesModule } from './features/+specialties/specialty.module';
import { StudentsModule } from './features/+students/students.module';
import { UsersModule } from './features/+users/users.module';
import { HandlebarsAdapter, MailerModule } from '@nestjs-modules/mailer';
import { DiplomasModule } from './features/+diplomas/diplomas.module';
import { DiplomaInstructorThemeRequestsModule } from './features/+diploma-instructor-theme-requests/diploma-instructor-theme-requests.module';
import { TasksService } from './services/tasks.service';
import { StagesModule } from './features/+stages/stages.module';
import path = require('path');
import { PracticesModule } from './features/+practices/practices.module';
import { DiplomaProtectionsModule } from './features/+diploma-protections/diploma-protections.module';
import { ArchievesModule } from './features/+archieves/archieves.module';

@Module({
  imports: [
    MongooseModule.forRoot(process.env.DB_URL, {
      useNewUrlParser: true
    }),
    MailerModule.forRoot({
      transport: {
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // upgrade later with STARTTLS
        auth: {
          user: process.env.EMAIL,
          pass: process.env.PASSWORD,
        },
      },
      defaults: {
        from: '"nest-modules" <modules@nestjs.com>',
      },
      template: {
        dir: process.cwd() + '/templates/',
        adapter: new HandlebarsAdapter(), // or new PugAdapter()
        options: {
          strict: true,
        },
      },
    }),
    ConfigModule.forRoot(),
    AuthModule,
    UsersModule,
    DepartmentsModule,
    StudentsModule,
    ProfessorsModule,
    SpecialtiesModule,
    StagesModule,
    EducationalProgramsModule,
    DiplomaInstructorRequestsModule,
    DiplomaInstructorThemeRequestsModule,
    DiplomasModule,
    FilesModule,
    OrdersModule,
    PracticesModule,
    PracticesModule,
    DiplomaProtectionsModule,
    ArchievesModule,
    ScheduleModule.forRoot(),
    MulterModule.register({
      dest: path.resolve(__dirname + "/public"),
    }),
  ],
  controllers: [AppController],
  providers: [AppService, TasksService],
})
export class AppModule {}
