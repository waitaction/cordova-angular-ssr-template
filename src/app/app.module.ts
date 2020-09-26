import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';

import { AppRoutesModule } from './app-routing.module';

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
    AppRoutesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
