import { RequestStatus } from './../../../enums/request-status.enum';

export interface SearchRequestsQuery {
    fromId?: string;
    status?: RequestStatus,
}