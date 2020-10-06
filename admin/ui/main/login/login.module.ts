import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LoginComponent } from './login.component';
import { LoginRoutesModule } from './login-routes.module';
import { XInputModule } from '@ng-nest/ui/input';
import { XButtonModule } from '@ng-nest/ui/button';
import { XMessageModule } from '@ng-nest/ui/message';
import { ShareModule } from '../../share/share.module';

@NgModule({
  imports: [
    CommonModule,
    ShareModule,
    XInputModule,
    XButtonModule,
    XMessageModule,
    LoginRoutesModule
  ],
  declarations: [LoginComponent]
})
export class LoginModule { }
