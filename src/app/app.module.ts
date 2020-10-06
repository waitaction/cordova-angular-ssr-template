import { BrowserModule, BrowserTransferStateModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { CookieModule, TransferHttpModule, TransferHttpService } from '@gorniv/ngx-universal';
import { HttpClientModule } from '@angular/common/http';
import { RouterModule } from '@angular/router';
import { ShareModule } from 'admin/ui/share/share.module';
import { AppRoutingModule } from './app-routing.module';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule.withServerTransition({ appId: 'serverApp' }),
    BrowserAnimationsModule,
    RouterModule,
    AppRoutingModule,
    HttpClientModule,
    TransferHttpModule,
    BrowserTransferStateModule,
    CookieModule.forRoot(),
    ShareModule
  ],
  providers: [
    TransferHttpService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }



