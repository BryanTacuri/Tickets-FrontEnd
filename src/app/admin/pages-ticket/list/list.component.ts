import { Component, OnDestroy, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { NzTableQueryParams } from 'ng-zorro-antd/table';
import { BarraService } from 'src/app/services/barra.service';
import { Pagination } from 'src/app/models/Pagination';
import { Ticket } from 'src/app/models/Ticket';
import { ValueService } from 'src/app/services/value.service';
import { TicketService } from 'src/app/services/ticket.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css'],
})
export class ListComponent implements OnInit, OnDestroy {
  search: string = '';
  searchDate: string = '';
  tickets: Ticket[] = [];
  pageIndex: number;
  pageTotal: number;
  pageSize: number;
  loading: boolean = false;
  pagination: Pagination = new Pagination();
  dataFound: String = '';
  params: {
    sortOrder: string | null;
    sortField: string | null;
    searchParam: string | null;
    searchParamDate: string | null;
    filters: Array<{ key: string; value: string[] }>;
  };

  search$: any;
  subscription: any;
  searchData$: any;
  subscriptionSearchData: any;

  constructor(
    private router: Router,
    private barraService: BarraService,
    private valueService: ValueService,
    private ticketService: TicketService,
    private message: NzMessageService
  ) {
    this.pageIndex = 1;
    this.pageTotal = 0;
    this.pageSize = 15;

    this.params = {
      sortField: null,
      sortOrder: null,
      searchParam: null,
      searchParamDate: null,
      filters: [],
    };
  }

  ngOnInit() {
    let p1 = this.getAllTickets(this.params);

    this.loading = true;
    Promise.all([p1]).then(
      (res) => (this.loading = false),
      (err) => {
        this.loading = false;
      }
    );

    this.barraService.disparadorBarra.subscribe((res) => {
      this.router.navigate(['/admin/ticket/add']);
    });
    this.searchData$ = this.barraService.searchDate;

    this.subscriptionSearchData = this.searchData$.subscribe((res: string) => {
      this.searchDate = res;
      this.params.searchParamDate = res;
      let searchPromise = this.getAllTickets(this.params);

      Promise.all([searchPromise]).then(
        (res) => (this.loading = false),
        (err) => {
          this.message.error(err.error.message || JSON.stringify(err));
        }
      );
    });

    this.search$ = this.barraService.search;
    this.subscription = this.search$.subscribe((res: string) => {
      this.search = res;

      this.params = {
        sortOrder: null,
        sortField: null,
        searchParamDate: null,
        filters: [],
        searchParam: this.search,
      };

      let searchPromise = this.getAllTickets(this.params);

      Promise.all([searchPromise]).then(
        (res) => (this.loading = false),
        (err) => {
          this.message.error(err.error.message || JSON.stringify(err));
        }
      );
    });
  }

  getIndexNumber(i: any) {
    return this.pagination.from + i;
  }

  getAllTickets(params: any): Promise<void> {
    return new Promise((resolve, reject) => {
      this.ticketService
        .getAllTickets(
          `?per_page=${this.pageSize}&page=${this.pageIndex}&sort=-id`,
          params
        )
        .subscribe({
          next: (res) => {
            this.tickets = res.data;
            this.pagination = res.pagination;
            this.dataFound = ' ';
            this.pageTotal = res.pagination.total;
            this.pageIndex = res.pagination.current_page;
            resolve();
          },
          error: (err) => {
            reject(err);
          },
        });
    });
  }

  filterGender = [
    { text: 'Pendiente', value: 'P' },
    { text: 'Cerrado', value: 'C' },
  ];

  pageIndexChange(event: any): void {
    this.pageIndex = event;
    this.loading = true;
    this.getAllTickets(this.params).then(
      (res) => (this.loading = false),
      (err) => {
        this.loading = false;
      }
    );
  }

  onQueryParamsChange(params: NzTableQueryParams): void {
    const { sort, filter } = params;

    const currentSort = sort.find((item) => item.value !== null);
    const sortField = (currentSort && currentSort.key) || null;
    const sortOrder = (currentSort && currentSort.value) || null;
    this.params = {
      sortField: sortField,
      sortOrder: sortOrder,
      filters: filter,
      searchParamDate: this.searchDate,
      searchParam: this.search,
    };
    this.getAllTickets(this.params);
  }

  editRow(id: any): void {
    this.valueService.setIsidTicket(id);
    this.valueService.idTicket = id;
    this.router.navigate(['/admin/ticket/edit', id]);
  }

  deleteRow(id: any): void {
    this.deleteManual(id);
  }

  deleteManual(id: any): void {
    this.loading = true;
    this.ticketService.deleteTicket(id).subscribe({
      next: (res) => {
        this.loading = false;
        this.message.success('Ticket eliminado correctamente');

        this.getAllTickets(this.params);
      },
      error: (err) => {
        this.loading = false;
        this.message.error(err.message || JSON.stringify(err));
      },
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
    this.subscriptionSearchData.unsubscribe();
  }
}
