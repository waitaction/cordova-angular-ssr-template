import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { RouterModule } from "@angular/router";
import { FormsModule } from "@angular/forms";

@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    FormsModule,
    RouterModule.forChild([
      {
        path: "",
        loadChildren: () =>
          import("./index/index.module").then((m) => m.IndexModule),
      }
 
    ]),
  ],
})
export class MainModule {}
