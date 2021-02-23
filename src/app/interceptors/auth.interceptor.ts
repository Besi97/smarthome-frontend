import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor
} from '@angular/common/http';
import {Observable} from 'rxjs';
import {mergeMap, take} from 'rxjs/operators';
import {AngularFireAuth} from '@angular/fire/auth';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

  constructor(
    private fireAuth: AngularFireAuth
  ) { }

  intercept(request: HttpRequest<unknown>, next: HttpHandler): Observable<HttpEvent<unknown>> {
    return this.fireAuth.idToken.pipe(
      take(1),
      mergeMap(idToken => {
        let clone = request.clone();
        if (idToken) {
          clone = clone.clone({setHeaders: {Authorization: `Bearer ${idToken}`}});
        }
        return next.handle(clone);
      })
    );
  }
}
