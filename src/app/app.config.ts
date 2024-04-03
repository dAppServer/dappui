import { ApplicationConfig } from '@angular/core';
import {provideRouter, withHashLocation, withRouterConfig} from '@angular/router';

import { routes } from './app.routes';
import {provideAnimations} from "@angular/platform-browser/animations";

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes, withHashLocation(),  withRouterConfig({
    onSameUrlNavigation: 'reload'
  })),provideAnimations(),]
};
