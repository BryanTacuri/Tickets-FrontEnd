import { Injectable, OnInit, Output } from '@angular/core';
import { Subject } from 'rxjs';
import { ChangeDetectorRef, EventEmitter } from '@angular/core';
import { ValueService } from 'src/app/services/value.service';
@Injectable({
  providedIn: 'root',
})
export class BarraService {
  @Output() disparadorBarra: EventEmitter<any> = new EventEmitter();
  @Output() search: EventEmitter<any> = new EventEmitter();
  @Output() searchDate: EventEmitter<any> = new EventEmitter();

  constructor() {}
}
