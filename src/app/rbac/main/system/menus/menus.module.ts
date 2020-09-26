import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MenusRoutesModule } from './menus-routes.module';
import { MenusComponent } from './menus.component';
import { MenuActionsComponent } from './menu-actions/menu-actions.component';
import { ActionDetailComponent } from './action-detail/action-detail.component';
import { XButtonModule } from '@ng-nest/ui/button';
import { AuAdaptionModule } from 'src/app/rbac/share/adaption/adaption.module';
import { NgNestModule } from 'src/app/rbac/share/ng-nest.module';
import { ShareModule } from 'src/app/rbac/share/share.module';
import { AuToolModule } from 'src/app/rbac/share/tool/tool.module';


@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XButtonModule,
    NgNestModule,
    AuToolModule,
    AuAdaptionModule,
    MenusRoutesModule
  ],
  declarations: [
    MenusComponent,
    MenuActionsComponent,
    ActionDetailComponent
  ]
})
export class MenusModule { }
