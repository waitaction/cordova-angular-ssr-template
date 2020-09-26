import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { layoutRoutes } from '../../rbac-routes';
import { IndexComponent } from './index.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: layoutRoutes
  }
];

@NgModule({
  imports: [
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRoutesModule { }
