import { isNil } from 'lodash';
import { ObjectID } from 'mongodb';
import { DocumentQuery, Model } from "mongoose";
import { ProfessorDocument } from './../../documents/professor.document';

export class SearchProfessorsQueryBuilder {
    private query: DocumentQuery<ProfessorDocument[], ProfessorDocument, {}>;
    
    constructor(
        private _professorModel: Model<ProfessorDocument>,
    ) {
        this.query = this._professorModel.find({});
    }

    public setIsActive(isActive: boolean): SearchProfessorsQueryBuilder {
        if (!isNil(isActive)) {
            this.query = this.query.find({
                isActive,
            });
        }
        
        return this;
    }

    public setDepartmentId(id: string | ObjectID): SearchProfessorsQueryBuilder {
        if (id) {
            this.query = this.query.find({
                department: id,
            });
        }
        
        return this;
    }

    public sortAsc(): SearchProfessorsQueryBuilder {
        this.query = this.query.sort([['_id', -1]]);

        return this;
    }

    public build() {
        return this.query.populate('department').exec();
    }
}