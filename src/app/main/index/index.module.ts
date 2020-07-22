import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { IndexComponent } from "./index.component";
import { FormsModule } from '@angular/forms';

@NgModule({
  declarations: [IndexComponent],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([{ path: "", component: IndexComponent, data: { animation: 'index' } }]),
  ],
})
export class IndexModule { }
