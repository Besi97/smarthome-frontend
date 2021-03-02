import {Routes} from '@angular/router';
import {LoginComponent} from './components/login/login.component';
import {canActivate, redirectLoggedInTo, redirectUnauthorizedTo} from '@angular/fire/auth-guard';
import {DevicesComponent} from './components/devices/devices.component';

const redirectLoggedInToHome = () => redirectLoggedInTo(['']);
const redirectUnauthorizedToLogin = () => redirectUnauthorizedTo(['login']);

export const routes: Routes = [
  { path: 'login', component: LoginComponent, ...canActivate(redirectLoggedInToHome)},
  { path: '', pathMatch: 'full', component: DevicesComponent, ...canActivate(redirectUnauthorizedToLogin)}
];
