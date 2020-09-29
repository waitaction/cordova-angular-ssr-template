import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users-routes.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ShareModule } from 'rbac/ui/share/share.module';
import { AuToolModule } from 'rbac/ui/share/tool/tool.module';
import { AuAdaptionModule } from 'rbac/ui/share/adaption/adaption.module';
import { NgNestModule } from 'rbac/ui/share/ng-nest.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    UsersRoutesModule
  ],
  declarations: [UsersComponent, UserDetailComponent]
})
export class UsersModule { }
