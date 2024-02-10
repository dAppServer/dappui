import { bootstrapApplication } from '@angular/platform-browser';
import { appConfig } from './core/app.config';
import { CoreFrameHeaderOnlyComponent } from './core/frame/header-only.component';

bootstrapApplication(CoreFrameHeaderOnlyComponent, appConfig)
  .catch((err) => console.error(err));
