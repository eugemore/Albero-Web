import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthInterceptorService } from '../shared/utils/interceptors/auth-interceptor.service';

import { FamilyChartRoutingModule } from './family-chart-routing.module';
import { MemberCardComponent } from './member-card/member-card.component';
import { FamilyChartService } from './services/families-chart.service';
import { SharedModule } from '../shared/shared.module';
import { ChartComponent } from './chart/chart.component';
import { ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';



@NgModule({
  declarations: [
    MemberCardComponent,
    ChartComponent,
    MemberDialogComponent
  ],
  imports: [
    CommonModule,
    FamilyChartRoutingModule,
    SharedModule,
    HttpClientModule,
    ReactiveFormsModule
  ],
  providers:[
    { provide: HTTP_INTERCEPTORS, useClass: AuthInterceptorService, multi: true },
    FamilyChartService,
  ]
})
export class FamilyChartModule { }
