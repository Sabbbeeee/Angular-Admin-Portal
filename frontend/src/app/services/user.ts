import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})

export class User {

  apiUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) {}

  getRecords(userid: string) {

    return this.http.get(

      `${this.apiUrl}/records/${userid}`

    );

  }

}