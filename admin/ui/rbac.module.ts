import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouteReuseStrategy, RouterModule } from '@angular/router';
import { HttpService } from '@nestjs/common';
import { XMessageService } from '@ng-nest/ui';
import { mainRoutes } from './rbac-routes';
import { AuthService } from './services/auth.service';
import { PreloadingStrategyService } from './services/preloading-strategy.service';
import { ReuseStrategyService } from './services/reuse-strategy.service';
import { ShareModule } from './share/share.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(mainRoutes
      /* , {
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




// import { NgModule } from "@angular/core";
// import { RouterModule, RouteReuseStrategy } from "@angular/router";
// import { mainRoutes } from 'admin/ui/rbac-routes';
// import { PreloadingStrategyService } from 'admin/ui/services/preloading-strategy.service';
// import { ReuseStrategyService } from 'admin/ui/services/reuse-strategy.service';


// @NgModule({
//   imports: [
//     RouterModule.forRoot(mainRoutes, {
//       enableTracing: false,
//       anchorScrolling: "enabled",
//       preloadingStrategy: PreloadingStrategyService
//     })
//   ],
//   exports: [RouterModule],
//   providers: [
//     PreloadingStrategyService,
//     { provide: RouteReuseStrategy, useClass: ReuseStrategyService }
//   ]
// })
// export class AppRoutesModule { }