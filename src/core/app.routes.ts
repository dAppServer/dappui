import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'apps', loadChildren: () => import('./pkg/module').then((m) => m.CorePkgModule) , },
    { path: 'system', loadChildren: () => import('./system/module').then((m) => m.CoreSystemDashboardModule) , },
];
