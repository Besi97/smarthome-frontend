import { Component } from '@angular/core';
import {AuthProvider, Theme} from 'ngx-auth-firebaseui';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  providers = AuthProvider;
  themes = Theme;

  constructor() { }

}
