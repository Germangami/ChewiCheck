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


export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideHttpClient(),
    provideRouter(routes), 
    provideClientHydration(), 
    provideAnimationsAsync(), 
    provideStore([],
      withNgxsReduxDevtoolsPlugin(),
      withNgxsLoggerPlugin(),
      withNgxsStoragePlugin({keys: '*'}),
      withNgxsWebSocketPlugin()
    ),
  ]
};
