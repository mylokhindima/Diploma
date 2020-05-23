import { ObjectID } from 'mongodb';
import { DiplomaDocument } from './../../documents/diploma.document';
import { Model, DocumentQuery } from "mongoose";

export class SearchDiplomaQueryBuilder {
    private query: DocumentQuery<DiplomaDocument[], DiplomaDocument, {}>;
    
    constructor(
        private _diplomaModel: Model<DiplomaDocument>,
    ) {
        this.query = this._diplomaModel.find({});
    }

    public setStudentId(id: string | ObjectID): SearchDiplomaQueryBuilder {
        if (id) {
            this.query = this.query.find({
                student: id,
            });
        }
        
        return this;
    }

    public setStageId(id: string | ObjectID): SearchDiplomaQueryBuilder {
        if (id) {
            this.query = this.query.find({
                stage: id,
            });
        }
        
        return this;
    }

    public build() {
        return this.query.populate('student').populate('instructor').populate('stage').exec();
    }
}