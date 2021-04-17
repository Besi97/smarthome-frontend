import {Routes} from '@angular/router';
import { AdminComponent } from './components/admin/admin.component';
import { DevicesComponent } from './components/devices/devices.component';
import { UsersComponent } from './components/users/users.component';

export const adminRoutes: Routes = [
  { 
    path: '',
    component: AdminComponent,
    children: [
      {path: 'users', component: UsersComponent},
      {path: 'devices', component: DevicesComponent},
      {path: '**', redirectTo: 'users'}
    ]
  }
];
