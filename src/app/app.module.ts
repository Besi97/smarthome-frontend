import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {NgxAuthFirebaseUIModule} from 'ngx-auth-firebaseui';
import {RouterModule} from '@angular/router';
import {AppComponent} from './app.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {ExtendedModule} from '@angular/flex-layout';
import {LoginComponent} from './components/login/login.component';
import {HTTP_INTERCEPTORS, HttpClientModule} from '@angular/common/http';
import {AuthInterceptor} from './interceptors/auth.interceptor';
import { DevicesComponent } from './components/devices/devices.component';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatCardModule } from '@angular/material/card';
import { MatMenuModule } from '@angular/material/menu';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { LayoutModule } from '@angular/cdk/layout';
import {routes} from './routes';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    DevicesComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxAuthFirebaseUIModule.forRoot({
      apiKey: 'AIzaSyB2ZchJhCwlUWnfC627-JOKWDZ_o1cmC9E',
      authDomain: 'smarthome-v2-304611.firebaseapp.com',
      projectId: 'smarthome-v2-304611',
      storageBucket: 'smarthome-v2-304611.appspot.com',
      messagingSenderId: '1084599950315',
      appId: '1:1084599950315:web:61672e98584e56dfcfd7ae',
      measurementId: 'G-L4RZDKZ0RD'
    }),
    RouterModule.forRoot(routes),
    ExtendedModule,
    HttpClientModule,
    MatGridListModule,
    MatCardModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    LayoutModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
