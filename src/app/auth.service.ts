import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from '../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = `${environment.baseApiURL}api/users`;

  constructor(private http: HttpClient) {}

  register(username: string, password: string, email: string): Observable<any> {
    const url = `${this.apiUrl}/register`;
    return this.http.post(
      url,
      { username, password, email },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  login(username: string, password: string): Observable<any> {
    const url = `${this.apiUrl}/login`;
    return this.http.post(
      url,
      { username, password },
      {
        headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
      }
    );
  }

  getProfile(token: string): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    return this.http.get(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }

  updateProfile(
    token: string,
    username: string,
    email: string
  ): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    return this.http.put(
      url,
      { username, email },
      {
        headers: new HttpHeaders({
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        }),
      }
    );
  }

  deleteProfile(token: string): Observable<any> {
    const url = `${this.apiUrl}/profile`;
    return this.http.delete(url, {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      }),
    });
  }
}
