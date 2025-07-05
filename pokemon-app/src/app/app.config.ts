import {
  ApplicationConfig,
  provideBrowserGlobalErrorListeners,
  provideZoneChangeDetection,
  importProvidersFrom
} from '@angular/core';
import {provideRouter} from '@angular/router';

import {routes} from './app.routes';
import {icons} from './icons-provider';
import {provideNzIcons} from 'ng-zorro-antd/icon';
import {pl_PL, provideNzI18n} from 'ng-zorro-antd/i18n';
import {registerLocaleData} from '@angular/common';
import pl from '@angular/common/locales/pl';
import {FormsModule} from '@angular/forms';
import {provideAnimationsAsync} from '@angular/platform-browser/animations/async';
import {provideHttpClient} from '@angular/common/http';

registerLocaleData(pl);

export const appConfig: ApplicationConfig = {
  providers: [
    provideBrowserGlobalErrorListeners(),
    provideZoneChangeDetection({eventCoalescing: true}),
    provideRouter(routes), provideNzIcons(icons), provideNzI18n(pl_PL), importProvidersFrom(FormsModule), provideAnimationsAsync(), provideHttpClient()
  ]
};
