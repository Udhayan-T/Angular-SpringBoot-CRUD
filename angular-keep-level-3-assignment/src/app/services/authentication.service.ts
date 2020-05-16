import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import 'rxjs/add/operator/map';

@Injectable()
export class AuthenticationService {

  authUrl: string;
  constructor(private httpClient: HttpClient) {
    this.authUrl = 'http://localhost:8089/api/v1/auth/';
  }

  authenticateUser(data) {
    console.log(data);
    return this.httpClient.post('http://localhost:8089/api/v1/auth/login', data);
  }

  setBearerToken(token) {
    localStorage.setItem('bearerToken', token);
  }

  getBearerToken() {
    return localStorage.getItem('bearerToken');
  }

  setUserId(userId) {
    localStorage.setItem('userId', userId);
  }

  getUserId() {
    return localStorage.getItem('userId');
  }

  isTokenExpired() {
    return true;
  }
  
  isUserAuthenticated(token): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.httpClient.post('http://localhost:8089/api/v1/auth/isAuthenticated', {
       headers: { 'Authorization': `Bearer ${token}` }
      }).subscribe(res => {
            resolve(res['isAuthenticated']);
            console.log(res['isAuthenticated'] +" isAuthenticated service method within subscribe "+res);
      },
        err => {
            reject(err);
            console.log("Within authentication.service.ts isUserAuthenticated within err() "+err);
        }
      );
    })
  }
}






