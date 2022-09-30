import { Pagination } from './Pagination';

export class ApiResponse {
  constructor(
    public data: any,
    public pagination: Pagination = new Pagination(),
    public message: string,
    public status: number
  ) {}
}
