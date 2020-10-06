import { Component, ViewChild } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { openCloseAnimate } from './app-router.animations';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  animations: [openCloseAnimate],
})
export class AppComponent {
  title = 'ng-nest-admin-ui';
  @ViewChild(RouterOutlet, { static: true }) routerOutlet;
  constructor() {

  }

  getState(outlet: RouterOutlet) {
    return outlet.activatedRouteData.state;
  }

  onActivate(event) {
    console.log(event);
  }
  onDeactivate(event) {
    console.log(event);
  }

  prepareRoute(outlet: RouterOutlet): boolean {
    return outlet && outlet.activatedRouteData && outlet.activatedRouteData.state;
  }
}
