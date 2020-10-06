import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutesModule } from './home-routes.module';
import { HomeComponent } from './home.component';
import { AuAdaptionModule } from '../../share/adaption/adaption.module';
import { NgNestModule } from '../../share/ng-nest.module';
import { ShareModule } from '../../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuAdaptionModule,
    HomeRoutesModule
  ],
  declarations: [HomeComponent],
  exports: [HomeComponent]
})
export class HomeModule { }
