import { Component } from '@angular/core';
import { IonicModule, ToastController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  selector: 'app-register',
  imports: [IonicModule, FormsModule],
  template: `
  <ion-content class="ion-padding page">

    <div class="container">

      <ion-icon name="timer-outline" class="logo"></ion-icon>

      <h1>Criar Conta</h1>
      <p class="subtitle">Comece sua jornada de foco agora mesmo.</p>

      <div class="card">

        <ion-item lines="none" class="input-item">
          <ion-label position="floating">E-mail</ion-label>
          <ion-input [(ngModel)]="email" type="email" inputmode="email"></ion-input>
        </ion-item>

        <ion-item lines="none" class="input-item">
          <ion-label position="floating">Senha</ion-label>
          <ion-input [(ngModel)]="password" type="password" autocomplete="new-password"></ion-input>
        </ion-item>

        <ion-button expand="block" color="warning" class="register-btn" (click)="register()">
          Cadastrar
        </ion-button>

        <ion-text class="links">
          Já tem uma conta? <a (click)="goLogin()">Faça login</a>
        </ion-text>

      </div>

    </div>

  </ion-content>
  `,
  styles: [`
    /* page background */
    .page {
      --background: #000 !important;
      color: #ffffff;
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
    }

    .container {
      max-width: 380px;
      width: 100%;
      text-align: center;
      margin: auto;
      padding: 20px 16px;
    }

    .logo {
      font-size: 64px;
      color: orange;
      margin-bottom: 8px;
    }

    h1 {
      font-size: 28px;
      margin: 6px 0 2px 0;
      font-weight: 700;
      color: #fff;
    }

    .subtitle {
      color: #bfbfbf;
      margin-bottom: 18px;
      font-size: 14px;
    }

    /* card */
    .card {
      background: linear-gradient(180deg, #0f0f0f 0%, #141414 100%);
      padding: 22px;
      border-radius: 16px;
      box-shadow: 0 8px 24px rgba(0,0,0,0.6);
      border: 1px solid rgba(255,165,0,0.06);
      animation: popIn 0.28s ease;
    }

    @keyframes popIn {
      from { opacity: 0; transform: translateY(8px) scale(0.995); }
      to { opacity: 1; transform: translateY(0) scale(1); }
    }

    /* inputs */
    .input-item {
      --background: #0e0e0e;
      --border-color: #262626;
      color: #fff;
      border-radius: 12px;
      margin-bottom: 12px;
      padding: 6px;
      border: 1px solid rgba(255,255,255,0.03);
    }

    ion-label {
      color: #dcdcdc !important;
      font-weight: 500;
    }

    ion-input {
      color: #fff !important;
    }

    /* register button */
    .register-btn {
      margin-top: 8px;
      border-radius: 12px;
      font-weight: 800;
      height: 48px;
      --background: orange;
      --box-shadow: 0 6px 18px rgba(255,165,0,0.12);
      transition: transform 0.12s ease, filter 0.12s ease;
    }
    .register-btn:active { transform: translateY(1px) scale(0.998); }

    /* links */
    .links {
      display: block;
      margin-top: 14px;
      color: #bfbfbf;
      font-size: 14px;
    }

    a {
      color: orange;
      cursor: pointer;
      font-weight: 600;
    }

    /* responsive */
    @media (max-width: 420px) {
      .container { padding: 12px; }
      .logo { font-size: 56px; }
      h1 { font-size: 24px; }
      .card { padding: 18px; }
    }
  `]
})
export class RegisterComponent {
  email = '';
  password = '';

  constructor(private router: Router, private toastCtrl: ToastController) {}

  async register() {
    if (!this.email || !this.password || this.password.length < 6) {
      const toast = await this.toastCtrl.create({
        message: 'Preencha todos os campos corretamente',
        duration: 2000,
        color: 'danger'
      });
      toast.present();
      return;
    }
    // aqui você pode adicionar lógica real de cadastro (API / Firebase)
    this.router.navigate(['/login']);
  }

  goLogin() {
    this.router.navigate(['/login']);
  }
}
