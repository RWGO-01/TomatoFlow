import { Component, Input, Output, EventEmitter } from '@angular/core';
import { IonicModule, ModalController } from '@ionic/angular';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-settings-modal',
  imports: [IonicModule, FormsModule],
  template: `
  <ion-header>
    <ion-toolbar class="toolbar-dark">
      <ion-title class="title-light">Configurações de Tempo</ion-title>
      <ion-buttons slot="end">
        <ion-button class="btn-close" (click)="close()">Fechar</ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <ion-content class="content-dark ion-padding">

    <div class="settings-card">

      <ion-item class="item-dark">
        <ion-label class="label-light">Pomodoro (min)</ion-label>
        <ion-input class="input-dark" type="number" [(ngModel)]="pomodoro"></ion-input>
      </ion-item>

      <ion-item class="item-dark">
        <ion-label class="label-light">Descanso Curto (min)</ion-label>
        <ion-input class="input-dark" type="number" [(ngModel)]="shortBreak"></ion-input>
      </ion-item>

      <ion-item class="item-dark">
        <ion-label class="label-light">Descanso Longo (min)</ion-label>
        <ion-input class="input-dark" type="number" [(ngModel)]="longBreak"></ion-input>
      </ion-item>

      <ion-button expand="block" color="warning" class="btn-save" (click)="save()">
        Salvar
      </ion-button>

    </div>

  </ion-content>
  `,
  styles: [`
    /* Fundo total */
    .content-dark {
      --background: #0d0d0d;
      background-color: #0d0d0d;
      color: #fff;
    }

    /* Header escuro */
    .toolbar-dark {
      --background: #111111;
      color: #ffffff;
      border-bottom: 1px solid #333;
    }

    .title-light {
      color: #ffffff;
      font-weight: 600;
    }

    .btn-close {
      color: #ffb84d;
      font-weight: bold;
    }

    /* Card central */
    .settings-card {
      background: #1a1a1a;
      padding: 20px;
      border-radius: 14px;
      box-shadow: 0px 0px 8px rgba(255, 166, 0, 0.08);
      margin-top: 20px;
    }

    /* Inputs */
    .item-dark {
      --background: #1a1a1a;
      --border-color: #333;
      border-radius: 8px;
      margin-bottom: 12px;
      color: #fff;
    }

    .label-light {
      color: #fff;
      font-weight: 500;
    }

    .input-dark {
      --background: #111;
      --color: #fff;
      --placeholder-color: #999;
      padding: 8px;
    }

    /* Botão de salvar */
    .btn-save {
      margin-top: 18px;
      font-weight: bold;
      --border-radius: 10px;
      height: 45px;
      transition: 0.2s ease-in-out;
    }

    .btn-save:hover {
      filter: brightness(1.15);
      transform: scale(1.03);
    }
  `]
})
export class SettingsModalComponent {
  @Input() pomodoro = 25;
  @Input() shortBreak = 5;
  @Input() longBreak = 15;
  @Output() saveSettings = new EventEmitter<{ pomodoro: number; shortBreak: number; longBreak: number }>();

  constructor(private modalCtrl: ModalController) {}

  save() {
    this.saveSettings.emit({
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak
    });
    this.modalCtrl.dismiss({
      pomodoro: this.pomodoro,
      shortBreak: this.shortBreak,
      longBreak: this.longBreak
    });
  }

  close() {
    this.modalCtrl.dismiss();
  }
}
