import {
  Component,
  PLATFORM_ID,
  inject
} from '@angular/core';

import {
  CommonModule,
  isPlatformBrowser
} from '@angular/common';

import { Router } from '@angular/router';

import { MatCardModule } from '@angular/material/card';

import { MatButtonModule } from '@angular/material/button';

import { User } from '../../services/user';

@Component({
  selector: 'app-dashboard',

  standalone: true,

  imports: [
    CommonModule,
    MatCardModule,
    MatButtonModule
  ],

  templateUrl: './dashboard.html',

  styleUrl: './dashboard.css'
})

export class Dashboard {

  platformId = inject(PLATFORM_ID);

  user: any = {};

  records: any[] = [];

  loading = true;

  constructor(

    private router: Router,

    private userService: User

  ) {

    if (isPlatformBrowser(this.platformId)) {

      const storedUser =
        localStorage.getItem('user');

      if (storedUser) {

        this.user = JSON.parse(storedUser);

        this.loadRecords();

      }

    }

  }

  loadRecords() {

    this.userService

      .getRecords(this.user.userid)

      .subscribe({

        next: (data: any) => {

          this.records = data;

          this.loading = false;

        },

        error: () => {

          this.loading = false;

        }

      });

  }

  logout() {

    if (isPlatformBrowser(this.platformId)) {

      localStorage.removeItem('user');

    }

    this.router.navigate(['/']);

  }

}