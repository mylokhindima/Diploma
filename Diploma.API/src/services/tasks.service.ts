import { MailerService } from '@nestjs-modules/mailer';
import { Injectable } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import * as moment from 'moment';
import { Step } from './../enums/step.enum';
import { DiplomaStore } from './../features/+diplomas/diplomas.store';
import { StagesStore } from './../features/+stages/stages.store';

@Injectable()
export class TasksService {
  private readonly _notificationDifference = 3;

  constructor(
    private readonly mailerService: MailerService,
    private readonly stagesStore: StagesStore, 
    private readonly diplomasStore: DiplomaStore, 
  ) {}  

  @Cron(CronExpression.EVERY_DAY_AT_8AM)
  async notifyStudentDeadlines() {
    const stages = (await this.stagesStore.findAll())
        .filter(s => s.step !== Step.MethodologicalMemberThemeChecking && s.endDate);

    const filters = stages.map(s => this.diplomasStore.filter({ stageId: s.id }));

    const diplomasMap = await Promise.all(filters);

    diplomasMap.filter(diplomas => diplomas.length).forEach((diplomas, i) => {
        const stage = stages[i];

        const daysDiff = moment(stage.endDate).diff(moment(), 'days');

        if (daysDiff <= this._notificationDifference && daysDiff >= 0) {
            diplomas.forEach(diploma => { 
                let text = this._getText(stage.step);

                if(daysDiff !== 0) {
                    text += ` ${daysDiff} days left!`;
                } else {
                    const hoursDiff = moment(stage.endDate).diff(moment(), 'hours');
                    text += ` ${hoursDiff} hours left!`;
                }

                this.mailerService.sendMail({
                    to: diploma.student.email, 
                    from: process.env.EMAIL, 
                    subject: 'Reaching deadline!', 
                    text,
                    html: text,
                  }).then();
            })
        }
    });
  }

  private _getText(step: Step): string {
    let task: string;

    switch(step) {
        case Step.ChooseInstructor: 
            task = 'Choose diploma instructor';
            break;
        case Step.InstructorThemeChecking: 
            task = 'Choose diploma theme';
            break;
        case Step.PracticeReport: 
            task = 'Upload practice report';
            break;
        case Step.DiplomaReport:
            task = 'Upload diploma report';
            break;
        case Step.Normscontrol: 
            task = 'Pass diploma normscontrol';
            break;
        case Step.Plagiarism:
            task = 'Pass diploma plagiarism';
            break;
        case Step.DiplomaMaterials: 
            task = 'Upload diploma materials';
            break;
    }

    return `You're almost reached ${task} task deadline.`;
  }
}