import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { UsersRoutesModule } from './users-routes.module';
import { UsersComponent } from './users.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { ShareModule } from 'admin/ui/share/share.module';
import { AuToolModule } from 'admin/ui/share/tool/tool.module';
import { AuAdaptionModule } from 'admin/ui/share/adaption/adaption.module';
import { NgNestModule } from 'admin/ui/share/ng-nest.module';

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
