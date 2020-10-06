import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main.component.html'
})
export class MainComponent implements OnInit {

  constructor(
    public injector: Injector,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {

  }
  async ngOnInit() {
    this.router.navigateByUrl("/list");
  }

}

