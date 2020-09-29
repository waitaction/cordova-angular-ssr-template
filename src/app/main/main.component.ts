import { Component, Injector, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
import { BaseUniversal } from '../base-universal';

@Component({
  selector: 'app-main-page',
  templateUrl: 'main.component.html'
})
export class MainComponent extends BaseUniversal implements OnInit {

  constructor(
    public injector: Injector,
    public router: Router,
    public activatedRoute: ActivatedRoute
  ) {
    super(injector);


  }
  async ngOnInit() {
    this.router.navigateByUrl("/list");
  }

}

