import { NgModule } from "@angular/core";
import { RouterModule, RouteReuseStrategy } from "@angular/router";
import { mainRoutes } from "./rbac/rbac-routes";
import { PreloadingStrategyService } from './rbac/services/preloading-strategy.service';
import { ReuseStrategyService } from './rbac/services/reuse-strategy.service';

@NgModule({
  imports: [
    RouterModule.forRoot(mainRoutes, {
      enableTracing: false,
      anchorScrolling: "enabled",
      preloadingStrategy: PreloadingStrategyService
    })
  ],
  exports: [RouterModule],
  providers: [
    PreloadingStrategyService,
    { provide: RouteReuseStrategy, useClass: ReuseStrategyService }
  ]
})
export class AppRoutesModule { }
