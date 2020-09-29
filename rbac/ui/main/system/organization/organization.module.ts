import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutesModule } from './organization-routes.module';
import { OrganizationComponent } from './organization.component';
import { AuAdaptionModule } from 'rbac/ui/share/adaption/adaption.module';
import { NgNestModule } from 'rbac/ui/share/ng-nest.module';
import { ShareModule } from 'rbac/ui/share/share.module';
import { AuToolModule } from 'rbac/ui/share/tool/tool.module';

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
