import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DashboardRoutesModule } from './dashboard-routes.module';
import { DashboardComponent } from './dashboard.component';
import { AuAdaptionModule } from '../../share/adaption/adaption.module';
import { NgNestModule } from '../../share/ng-nest.module';
import { ShareModule } from '../../share/share.module';


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuAdaptionModule,
    DashboardRoutesModule
  ],
  declarations: [DashboardComponent],
  exports: [DashboardComponent]
})
export class DashboardModule { }
