import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { AppRoutesModule } from './app-routing.module';
import { ShareModule } from './rbac/share/share.module';
import { UniversalStorageService } from 'src/app/core/universal-storage.service';
import { CookieModule, TransferHttpModule, TransferHttpService } from '@gorniv/ngx-universal';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ClientStateInterceptor } from 'src/app/core/clientstate.interceptor';
import { UniversalToolService } from 'src/app/core/universal-tool.service';

function fixedUniversal() {
  if (!((typeof window != 'undefined') && window)) {
    //ng-nest在服务端渲染时会执行getComputedStyle这个方法，导致报错
    globalThis.getComputedStyle = function () {
      return null;
    };
  }
}

fixedUniversal();

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule,
    AppRoutesModule,
    HttpClientModule,
    TransferHttpModule,
    BrowserTransferStateModule,
    CookieModule.forRoot(),
    ShareModule
  ],
  providers: [
    TransferHttpService,
   // { provide: HTTP_INTERCEPTORS, useClass: ClientStateInterceptor, multi: true },
    // { provide: RouteReuseStrategy, useClass: LocalRouteReuseStrategy },
    UniversalStorageService,
    UniversalToolService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



