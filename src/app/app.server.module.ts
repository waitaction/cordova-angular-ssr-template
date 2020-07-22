import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from '@gorniv/ngx-universal';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { ServerStateInterceptor } from '@core/serverstate.interceptor';


@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [AppComponent],
  providers: [
    { provide: CookieService, useClass: CookieBackendService },
    { provide: HTTP_INTERCEPTORS, useClass: ServerStateInterceptor, multi: true }
  ],
})
export class AppServerModule { }
