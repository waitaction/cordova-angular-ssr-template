import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-list",
  templateUrl: "./list.component.html",
  styleUrls: ["./list.component.scss"]
})
export class ListComponent implements OnInit, OnDestroy {

  constructor(public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

  }
  ngOnDestroy() {

  }
}
