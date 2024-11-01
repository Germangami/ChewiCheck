import { Routes } from '@angular/router';
import { ClientPageComponent } from './components/client-page/client-page.component';
import { OwnerPageComponent } from './components/owner-page/owner-page.component';

export const routes: Routes = [
    // {
    //     path: '',

    // },
    {
        path: 'client',
        component: ClientPageComponent
    },
    {
        path: 'owner',
        component: OwnerPageComponent
    }
];
