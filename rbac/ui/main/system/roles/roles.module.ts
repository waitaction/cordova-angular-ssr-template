import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RolesRoutesModule } from './roles-routes.module';
import { RolesComponent } from './roles.component';
import { RoleDetailComponent } from './role-detail/role-detail.component';
import { ShareModule } from 'rbac/ui/share/share.module';
import { AuToolModule } from 'rbac/ui/share/tool/tool.module';
import { AuAdaptionModule } from 'rbac/ui/share/adaption/adaption.module';
import { RolePermissionComponent } from './role-permission/role-permission.component';
import { NgNestModule } from 'rbac/ui/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    RolesRoutesModule
  ],
  declarations: [RolesComponent, RoleDetailComponent, RolePermissionComponent]
})
export class RolesModule {}
