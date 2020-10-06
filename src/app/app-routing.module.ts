import { NgModule } from '@angular/core';
import { RouterModule } from '@angular/router';

@NgModule({
  imports: [
    RouterModule.forRoot([
      { path: '', loadChildren: () => import('./main/main.module').then(m => m.MainModule) },
      // app路由
      { path: 'info', loadChildren: () => import('./info/info.module').then(m => m.InfoModule) },
      { path: 'list', loadChildren: () => import('./list/list.module').then(m => m.ListModule) },
      // rbac权限系统
      { path: 'admin', loadChildren: () => import('admin/ui/rbac.module').then(m => m.RbacModule) }
    ],
      { initialNavigation: 'enabled' })
  ],
  exports: [RouterModule],
  providers: [

  ]
})
export class AppRoutingModule { }



