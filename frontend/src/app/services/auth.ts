import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class Auth {

  apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  login(userData: any) {

    return this.http.post(

      `${this.apiUrl}/login`,
      userData

    );

  }

}