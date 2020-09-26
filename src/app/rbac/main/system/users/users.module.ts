import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users-routes.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ShareModule } from 'src/app/rbac/share/share.module';
import { AuToolModule } from 'src/app/rbac/share/tool/tool.module';
import { AuAdaptionModule } from 'src/app/rbac/share/adaption/adaption.module';
import { NgNestModule } from 'src/app/rbac/share/ng-nest.module';

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
