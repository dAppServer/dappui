import { Routes } from '@angular/router';

export const routes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'system', loadChildren: () => import('./system/module').then((m) => m.CoreSystemDashboardModule) , },
];
