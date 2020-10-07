import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';

if (environment.production) {
  enableProdMode();
}

document.addEventListener('DOMContentLoaded', () => {
  platformBrowserDynamic().bootstrapModule(AppModule)
    .catch(err => console.error(err))
    .finally(() => {
      setTimeout(() => {
        let script = document.createElement('script');
        script.src = 'cordova.js';
        document.getElementsByTagName('body')[0].append(script);
      }, 0);
    });
});
