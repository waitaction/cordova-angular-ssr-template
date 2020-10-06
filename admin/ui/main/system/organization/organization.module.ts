import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutesModule } from './organization-routes.module';
import { OrganizationComponent } from './organization.component';
import { AuAdaptionModule } from 'admin/ui/share/adaption/adaption.module';
import { NgNestModule } from 'admin/ui/share/ng-nest.module';
import { ShareModule } from 'admin/ui/share/share.module';
import { AuToolModule } from 'admin/ui/share/tool/tool.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    OrganizationRoutesModule
  ],
  declarations: [OrganizationComponent]
})
export class OrganizationModule { }
