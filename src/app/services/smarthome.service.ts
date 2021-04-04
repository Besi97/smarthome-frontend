import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {AngularFireAuth} from '@angular/fire/auth';
import {map, mergeMap, take} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class SmarthomeService {

  constructor(
    private http: HttpClient,
    private fireAuth: AngularFireAuth
  ) {
  }

  private getAuthHeader(): Observable<HttpHeaders> {
    return this.fireAuth.idToken.pipe(
      take(1),
      map(idToken => {
          return new HttpHeaders({Authorization: `Bearer ${idToken}`});
        }
      )
    );
  }

  requestWithAuthHeaders<T>(makeRequest: (authHeaders: HttpHeaders) => Observable<T>): Observable<T> {
    return this.getAuthHeader().pipe(
      take(1),
      mergeMap<HttpHeaders, Observable<T>>(authHeaders => {
        return makeRequest(authHeaders);
      })
    );
  }

  get<T>(path: string): Observable<T> {
    return this.requestWithAuthHeaders(authHeaders => {
      return this.http.get<T>(environment.apiBaseUrl + path, {headers: authHeaders});
    });
  }

  post<T>(path: string, body: any): Observable<T> {
    return this.requestWithAuthHeaders(authHeaders => {
      return this.http.post<T>(environment.apiBaseUrl + path, body, {headers: authHeaders});
    });
  }

  put<T>(path: string, body: any): Observable<T> {
    return this.requestWithAuthHeaders(authHeaders => {
      return this.http.put<T>(environment.apiBaseUrl + path, body, {headers: authHeaders});
    });
  }

  delete<T>(path: string): Observable<T> {
    return this.requestWithAuthHeaders(authHeaders => {
      return this.http.delete<T>(environment.apiBaseUrl + path, {headers: authHeaders});
    });
  }

}
