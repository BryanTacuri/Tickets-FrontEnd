import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PlanesAdminRoutingModule } from './admin-routing.module';
import { AddComponent } from './pages-ticket/add/add.component';

import { ListComponent } from './pages-ticket/list/list.component';
import { NgZorroModule } from '../ngzorro/ngzorro.module';
import { BarraModule } from '../barra/barra.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditComponent } from './pages-ticket/edit/edit.component';

@NgModule({
  declarations: [AddComponent, ListComponent, EditComponent],
  imports: [
    CommonModule,
    NgZorroModule,
    PlanesAdminRoutingModule,

    BarraModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class PlanesAdminModule {}
