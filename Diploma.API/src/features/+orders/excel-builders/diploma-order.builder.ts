import * as Excel from 'exceljs';
import { EducationalForm } from '../../../enums/educational-form.enum';
import { StudentDegree } from '../../../enums/student-degree.enum';
import { StudentEntity } from '../../../features/+students/student.entity';
import { DiplomaEntity } from './../../+diplomas/diploma.entity';
import { EducationalProgramEntity } from './../../+educational-program/educational-program.entity';
import moment = require('moment');
import path = require('path');

export class DiplomaOrderBuilder {
    
    private _workbook = new Excel.Workbook();

    constructor(private _educationalProgram: EducationalProgramEntity, private _startDate: string, private _endDate: string) {}

    public async build(map: [StudentEntity, DiplomaEntity][]): Promise<Excel.Workbook> {
        this._workbook = await this._workbook.xlsx.readFile(path.join(__dirname + '/diploma-order-template.xlsx')); 
        
        const worksheet = this._workbook.getWorksheet(1);
        worksheet.getCell('A9:F9').value = this._getDescriptionText(this._educationalProgram, this._startDate, this._endDate);

        const startIndex = 12;

        map.forEach(([student, diploma], i) => {
            worksheet.getRow(startIndex + i).values = [
                i + 1,
                student.name,
                student.group,
                diploma.theme,
                diploma.instructor.name,
            ]
        });

        return this._workbook;
    }

    private _getDescriptionText(educationalProgram: EducationalProgramEntity, startDate: string, endDate: string): string {
        const t1 = moment(startDate).format('DD.MM.YY') 
        const t2 = moment(endDate).format('DD.MM.YY') 

        const degree = educationalProgram.degree;

        let degreeText: string;
        let form: string;

        switch(educationalProgram.form) {
            case EducationalForm.DayTime: 
                form = 'денної';
                break;
            case EducationalForm.Extramural:
                form = 'заочної';
                break;
            case EducationalForm.Remote:
                form = 'дистанційної';
                break;
            default:
        }

        if (degree === StudentDegree.Bachelor) {
            degreeText = '4-го курсу першого бакалаврського рівня вищої освіти';
        } else {
            degreeText = '6-го курсу другого магістерського рівня вищої освіти';
        }

        return ` У відповідності до навчального плану за нижчевказаними студентами ${degreeText} ${form} форми навчання, факультету КН напряму ${educationalProgram.specialty.code} - ${educationalProgram.specialty.name} закріпити теми атестаційних робіт, призначити керівників атестаційних робіт і направити студентів на підготовку атестаційних робіт на період з ${t1} р. по ${t2} р.`	
    }
}