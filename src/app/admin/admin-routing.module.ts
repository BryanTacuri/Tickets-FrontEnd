import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AddComponent } from './pages-ticket/add/add.component';
import { EditComponent } from './pages-ticket/edit/edit.component';
import { ListComponent } from './pages-ticket/list/list.component';

const routes: Routes = [
  {
    path: '',
    children: [
      { path: '', component: ListComponent },
      { path: 'ticket/add', component: AddComponent },
      { path: 'ticket/list', component: ListComponent },
      { path: 'ticket/edit/:nombreTicket', component: EditComponent },

      { path: '**', redirectTo: '', pathMatch: 'full' },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class PlanesAdminRoutingModule {}
