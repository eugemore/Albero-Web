import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserGuard } from './shared/utils/guards/user.guard';

const routes: Routes = [
  {
    path: 'chart',
    loadChildren: () => import('./family-chart/family-chart.module').then(m => m.FamilyChartModule),
    canLoad:[UserGuard]
  },
  {
    path: 'login',
    loadChildren: () => import('./login/login.module').then(m => m.LoginModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
