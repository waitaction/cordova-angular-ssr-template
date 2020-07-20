import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { TransferHttpModule, CookieModule, TransferHttpService } from '@gorniv/ngx-universal';
import { UniversalStorageService } from 'src/core/universal-storage.service';
import { UniversalToolService } from 'src/core/universal-tool.service';
import { ClientStateInterceptor } from 'src/core/clientstate.interceptor';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TransferHttpModule,
    BrowserTransferStateModule,
    CookieModule.forRoot()
  ],
  providers: [
    TransferHttpService,
    { provide: HTTP_INTERCEPTORS, useClass: ClientStateInterceptor, multi: true },
    UniversalStorageService,
    UniversalToolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
