import { HttpClient, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { DateTime } from 'luxon';
import { concat, Observable, of } from 'rxjs';
import { catchError, tap, map, last } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

interface user {
  email: string,
  password: string
}

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient) { }

  signUp(user: user): Observable<HttpResponse<any>> {
    return concat(
      this.http.post(`${environment.authApi}/auth/signup`, user, { observe: 'response' }),
      this.login(user)
    ).pipe(
      last(),
      catchError(res => of(res))
    )
  }

  login(user: user): Observable<HttpResponse<any>> {
    return this.http.post(`${environment.authApi}/auth/login`, user, { observe: 'response' }).pipe(
      tap(res => this.setSession(res)),
      catchError(res => of(res))
    )
  }

  private setSession(authResult: HttpResponse<any>) {
    if (authResult.status == 200) {
      const result = authResult.body;
      const expiresAt = DateTime.fromMillis(result.expiresAt);
      console.log(expiresAt)
      localStorage.setItem('id_token', result.idToken);
      localStorage.setItem("expires_at", expiresAt.toISO());
    }
  }

  logout() {
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
  }

  public isLoggedIn(): boolean {
    return DateTime.now() <= this.getExpiration();
  }

  isLoggedOut() {
    return !this.isLoggedIn();
  }

  getExpiration(): DateTime {
    const expiration: string = localStorage.getItem("expires_at") ?? '';
    const expiresAt: DateTime = DateTime.fromISO(expiration);
    return expiresAt;
  }
}
