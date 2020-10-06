import { NgModule } from '@angular/core';
import { ServerModule, ServerTransferStateModule } from '@angular/platform-server';
import { AppModule } from './app.module';
import { AppComponent } from './app.component';
import { CookieService, CookieBackendService } from '@gorniv/ngx-universal';

@NgModule({
  imports: [
    AppModule,
    ServerModule,
    ServerTransferStateModule
  ],
  bootstrap: [
    AppComponent
  ],
  providers: [
    { provide: CookieService, useClass: CookieBackendService }
  ],
})
export class AppServerModule { }
