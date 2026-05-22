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

import { FormsModule } from '@angular/forms';

import { Auth } from '../../services/auth';

import { MatCardModule } from '@angular/material/card';

import { MatFormFieldModule } from '@angular/material/form-field';

import { MatInputModule } from '@angular/material/input';

import { MatButtonModule } from '@angular/material/button';

import { MatSelectModule } from '@angular/material/select';

import { MatOptionModule } from '@angular/material/core';

import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

import {
  MatSnackBar,
  MatSnackBarModule
} from '@angular/material/snack-bar';

@Component({
  selector: 'app-login',

  standalone: true,

  imports: [
    CommonModule,
    FormsModule,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatOptionModule,
    MatProgressSpinnerModule,
    MatSnackBarModule
  ],

  templateUrl: './login.html',

  styleUrl: './login.css'
})

export class Login {

  platformId = inject(PLATFORM_ID);

  userid: string = '';

  password: string = '';

  role: string = '';

  loading = false;

  constructor(
    private router: Router,
    private authService: Auth,
    private snackBar: MatSnackBar
  ) {

    if (isPlatformBrowser(this.platformId)) {

      const user = localStorage.getItem('user');

      if (user) {

        const parsedUser = JSON.parse(user);

        if (parsedUser.role === 'Admin') {

          this.router.navigate(['/admin']);

        } else {

          this.router.navigate(['/dashboard']);

        }

      }

    }

  }

  login() {

    this.loading = true;

    const userData = {

      userid: this.userid,

      password: this.password,

      role: this.role

    };

    this.authService.login(userData)

      .subscribe({

        next: (response: any) => {

          if (isPlatformBrowser(this.platformId)) {

            localStorage.setItem(
              'user',
              JSON.stringify(response.user)
            );

          }

          this.loading = false;

          if (this.role === 'Admin') {

            this.router.navigate(['/admin']);

          } else {

            this.router.navigate(['/dashboard']);

          }

        },

        error: () => {

          this.loading = false;

          this.snackBar.open(

            'Invalid Credentials',

            'Close',

            {
              duration: 3000
            }

          );

        }

      });

  }

}