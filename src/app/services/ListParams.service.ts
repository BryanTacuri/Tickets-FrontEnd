import { HttpParams } from '@angular/common/http';
import { Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class ListParams {
  constructor() {}

  public GetListParams(listParams: any) {
    let params = new HttpParams();

    let ordenacion = '';

    if (listParams.sortField != null && listParams.sortField != '') {
      if (listParams.sortOrder === 'ascend') {
        ordenacion = '' + listParams.sortField;
      } else {
        ordenacion = '-' + listParams.sortField;
      }

      params = params.append('sort', `${ordenacion}`);
    }

    if (listParams.searchParam != null && listParams.searchParam != '') {
      params = params.append('search', `${listParams.searchParam}`);
    }

    if (
      listParams.searchParamDate != null &&
      listParams.searchParamDate != ''
    ) {
      params = params.append('searchDate', `${listParams.searchParamDate}`);
    }

    let array: any[] = [];

    listParams.filters.forEach((filter: { value: any[]; key: any }) => {
      filter.value.forEach((value: any) => {
        array = [...array, value];
      });
    });

    if (array.length > 0) {
      params = params.append('status', `${array}`);
    }

    return params;
  }
}
