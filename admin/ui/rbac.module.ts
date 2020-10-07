import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { mainRoutes } from './rbac-routes';
import { PreloadingStrategyService } from './services/preloading-strategy.service';
import { ReuseStrategyService } from './services/reuse-strategy.service';

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(mainRoutes
      /*,{
       enableTracing: false,
       anchorScrolling: "enabled",
       preloadingStrategy: PreloadingStrategyService
     }*/
    ),
    // ShareModule
  ],
  exports: [RouterModule],
  providers: [
    PreloadingStrategyService,
    { provide: RouteReuseStrategy, useClass: ReuseStrategyService }
  ]
})
export class RbacModule { }