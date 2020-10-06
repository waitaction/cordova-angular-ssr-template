import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterModule, Routes } from '@angular/router';
import { layoutRoutes } from '../../rbac-routes';
import { IndexComponent } from './index.component';
import { FloatNodeComponent } from './sider/float-node/float-node.component';

const routes: Routes = [
  {
    path: '',
    component: IndexComponent,
    children: layoutRoutes
  }
];

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild(routes)
  ],
  exports: [
    RouterModule
  ]
})
export class IndexRoutesModule { }
