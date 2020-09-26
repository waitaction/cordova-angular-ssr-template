import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { OrganizationRoutesModule } from './organization-routes.module';
import { OrganizationComponent } from './organization.component';
import { AuAdaptionModule } from 'src/app/rbac/share/adaption/adaption.module';
import { NgNestModule } from 'src/app/rbac/share/ng-nest.module';
import { ShareModule } from 'src/app/rbac/share/share.module';
import { AuToolModule } from 'src/app/rbac/share/tool/tool.module';

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
