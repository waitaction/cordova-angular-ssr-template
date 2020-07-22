import { Injectable } from "@angular/core";

@Injectable({ providedIn: "root" })
export class RouterAnimateService {
  isOpen: boolean;

  constructor() {}

  openPage() {
    let self = this;
    this.isOpen = false;
    setTimeout(() => {
      self.isOpen = true;
    }, 0);
  }
  closePage() {
    this.isOpen = false;
  }
}
