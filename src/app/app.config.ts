import { ApplicationConfig, provideZoneChangeDetection } from '@angular/core';
import { provideRouter } from '@angular/router';
import { routes } from './app.routes';

import { provideClientHydration } from '@angular/platform-browser';
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';

import { withNgxsReduxDevtoolsPlugin } from '@ngxs/devtools-plugin';
import { withNgxsLoggerPlugin } from '@ngxs/logger-plugin';
import { withNgxsStoragePlugin } from '@ngxs/storage-plugin';
import { withNgxsWebSocketPlugin } from '@ngxs/websocket-plugin';
import { provideStore } from '@ngxs/store';
import { provideHttpClient } from '@angular/common/http';
import { ClientState } from './state/client/client.state';
import { MAT_DATE_LOCALE } from '@angular/material/core';
import { TelegramState } from './state/telegram/telegram.state';
import { MAT_FORM_FIELD_DEFAULT_OPTIONS } from '@angular/material/form-field';


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideStore([
      ClientState,
      TelegramState
    ],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin(),
      // withNgxsStoragePlugin({keys: '*'}),
      withNgxsWebSocketPlugin()
    ),
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
    {provide: MAT_FORM_FIELD_DEFAULT_OPTIONS, useValue: {floatLabel: 'always'}}
  ]
};
