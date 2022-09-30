export class Pagination {
  constructor(
    public current_page: number = 0,
    public first_page_url: string = '',
    public from: number = 0,
    public last_page: number = 0,
    public last_page_url: string = '',
    public next_page_url: string = '',
    public path: string = '',
    public per_page: number = 0,
    public prev_page_url: string = '',
    public to: number = 0,
    public total: number = 0
  ) {}
}
