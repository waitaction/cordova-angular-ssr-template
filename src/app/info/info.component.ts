import { Component, OnInit, OnDestroy } from "@angular/core";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-info",
  templateUrl: "./info.component.html",
  styleUrls: ["./info.component.scss"]
})
export class InfoComponent implements OnInit, OnDestroy {

  constructor(public activatedRoute: ActivatedRoute) {

  }

  ngOnInit() {

  }
  ngOnDestroy() {

  }
}
