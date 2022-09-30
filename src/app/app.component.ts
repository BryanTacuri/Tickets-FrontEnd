import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';
import { ValueService } from './services/value.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  title = 'Tickets';
  isCollapsed = false;

  constructor(
    private router: Router,
    private message: NzMessageService,
    public valueService: ValueService
  ) {}
  offsetTop = 0;
  onLogout() {
    this.valueService.CerrarSesion();
    this.router.navigate(['/login']);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
