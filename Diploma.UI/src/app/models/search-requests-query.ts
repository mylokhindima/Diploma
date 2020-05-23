import { RequestStatus } from './request-status.enum';

export interface SearchRequestsQuery {
  fromId?: string;
  status?: RequestStatus;
}
