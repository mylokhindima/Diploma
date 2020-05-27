import * as Excel from 'exceljs';

export interface ExcelBuilder {
    build(map: any): Promise<Excel.Workbook>;
}