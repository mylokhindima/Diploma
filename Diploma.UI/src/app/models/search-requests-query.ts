import { RequestStatus } from './request-status.enum';

export interface SearchRequestsQuery {
  toId?: string;
  fromId?: string;
  status?: RequestStatus;
}
