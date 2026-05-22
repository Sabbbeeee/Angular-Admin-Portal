import { Component } from '@angular/core';

import { CommonModule } from '@angular/common';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-admin',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],

  templateUrl: './admin.html',

  styleUrl: './admin.css'
})

export class Admin {

  users = [

    {
      id: 1,
      userid: 'admin',
      role: 'Admin'
    },

    {
      id: 2,
      userid: 'sabari',
      role: 'General User'
    }

  ];

  constructor(private router: Router) {}

  addUser() {

    const newUser = {

      id: this.users.length + 1,

      userid: 'newuser' + this.users.length,

      role: 'General User'

    };

    this.users.push(newUser);

  }

  deleteUser(id: number) {

    this.users = this.users.filter(
      user => user.id !== id
    );

  }

  logout() {

    localStorage.removeItem('user');

    this.router.navigate(['/']);

  }

}