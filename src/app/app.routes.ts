import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { 
    path: 'login',
    loadComponent: () => import('./login.component').then(m => m.LoginComponent),
  },
  { 
    path: 'register',
    loadComponent: () => import('./register.component').then(m => m.RegisterComponent),
  },
  { 
    path: 'reset-password',
    loadComponent: () => import('./reset-password.component').then(m => m.ResetPasswordComponent),
  },
  { 
    path: 'pomodoro',
    loadComponent: () => import('./pomodoro/pomodoro.component').then(m => m.PomodoroComponent),
  },
  { path: '**', redirectTo: 'login' },
];