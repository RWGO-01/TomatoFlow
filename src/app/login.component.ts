import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-login',
  imports: [IonicModule, FormsModule],
  template: `
  <ion-content class="ion-padding page">

    <div class="container">

      <ion-icon name="timer-outline" class="logo"></ion-icon>

      <h1>TomatoFocus</h1>
      <p class="subtitle">Faça login para focar no que importa.</p>

      <div class="card">

        <ion-item lines="none" class="dark-item input-item">
          <ion-label position="floating">E-mail</ion-label>
          <ion-input [(ngModel)]="email" type="email"></ion-input>
        </ion-item>

        <ion-item lines="none" class="dark-item input-item">
          <ion-label position="floating">Senha</ion-label>
          <ion-input [(ngModel)]="password" type="password"></ion-input>
        </ion-item>

        <ion-button expand="block" color="warning" class="login-btn" (click)="login()">
          Entrar
        </ion-button>

        <ion-text class="links">
          Não tem uma conta? <a (click)="goRegister()">Cadastre-se</a><br />
          <a (click)="goReset()">Esqueceu sua senha?</a>
        </ion-text>

      </div>

    </div>

  </ion-content>
  `,
  styles: [`
    .page {
      --background: #000 !important;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
    }

    .container {
      max-width: 380px;
      width: 100%;
      text-align: center;
      margin: auto;
      padding-top: 20px;
    }

    .logo {
      font-size: 70px;
      color: orange;
      margin-bottom: 10px;
    }

    h1 {
      font-size: 34px;
      margin: 0;
      font-weight: 700;
      color: #fff;
    }

    .subtitle {
      color: #cccccc;
      margin-top: 6px;
      margin-bottom: 22px;
      font-size: 15px;
    }

    .card {
      background: #111;
      padding: 25px;
      border-radius: 18px;
      box-shadow: 0 0 20px rgba(255, 165, 0, 0.08);
      animation: fadeIn 0.5s ease;
    }

    /* Inputs */
    .input-item {
      --background: #111;
      --color: #ffffff;
      color: #fff;
      border-radius: 14px;
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid #333;
    }

    ion-label {
      color: #ffffff !important;
    }

    ion-input {
      color: #ffffff !important;
    }

    /* Botão */
    .login-btn {
      margin-top: 10px;
      border-radius: 14px;
      font-weight: bold;
      height: 48px;
      --background: orange;
      --background-hover: #ffb347;
    }

    /* Links */
    .links {
      margin-top: 16px;
      color: #ccc;
    }

    a {
      color: orange;
      cursor: pointer;
      font-weight: 600;
    }

    /* Animação suave */
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
  `]
})
export class LoginComponent {
  email = '';
  password = '';

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async login() {
    if (!this.email || !this.password) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha e-mail e senha',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }
    this.router.navigate(['/pomodoro']);
  }

  goRegister() {
    this.router.navigate(['/register']);
  }

  goReset() {
    this.router.navigate(['/reset-password']);
  }
}
