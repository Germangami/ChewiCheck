import { Routes } from '@angular/router';
import { InvitePageComponent } from './pages/invite-page/invite-page.component';
import { DashboardComponent } from './pages/dashboard-page/dashboard-page.component';

export const routes: Routes = [
    {
        path: '',
        component: DashboardComponent
    },
    {
        path: 'invite-client',
        component: InvitePageComponent
    }
];
