import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuardGuard } from './auth-guard.guard';
import { LoginComponent } from './login/login.component';
const routes: Routes = [
  { path: '', component: LoginComponent, canActivate: [] },
  { path: 'login', component: LoginComponent, canActivate: [] },

  {
    path: 'admin',
    loadChildren: () =>
      import('./admin/admin.module').then((m) => m.PlanesAdminModule),
    canActivate: [AuthGuardGuard],
  },

  { path: '**', redirectTo: '', pathMatch: 'full' },
];
@NgModule({
  imports: [RouterModule.forRoot(routes, { useHash: true })],
  exports: [RouterModule],
})
export class AppRoutingModule {}
