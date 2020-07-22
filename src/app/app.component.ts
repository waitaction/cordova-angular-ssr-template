import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { routerAnimations } from './app-router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [routerAnimations]
})
export class AppComponent {
  title = 'cordova-angular-ssr-template';
  constructor() {

  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.animation;
  }
}
