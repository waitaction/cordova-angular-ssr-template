import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { MainComponent } from './main.component';
@NgModule({
  declarations: [
    MainComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      { path: '', component: MainComponent, data: { state: 'main' } }
    ])
  ],
  exports: [RouterModule]
})
export class MainModule { }
