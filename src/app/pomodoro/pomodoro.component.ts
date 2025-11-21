import { Component } from '@angular/core';
import { IonicModule, ModalController, PopoverController } from '@ionic/angular';
import { SettingsModalComponent } from './settings-modal.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-pomodoro',
  imports: [IonicModule, CommonModule, FormsModule, SettingsModalComponent],
  template: `
  <ion-header translucent>
    <ion-toolbar>
      <ion-title>
        <ion-icon name="timer-outline" slot="start" style="color: orange;"></ion-icon>
        TomatoFocus
      </ion-title>

      <ion-buttons slot="end">
        <ion-button (click)="openPopover($event)" aria-label="Menu">
          <ion-icon name="menu-outline" style="font-size: 24px; color: white;"></ion-icon>
        </ion-button>
      </ion-buttons>
    </ion-toolbar>
  </ion-header>

  <!-- botão Sair fixo no canto superior direito -->
  <div class="top-right-btn" (click)="logout()" role="button" tabindex="0" aria-label="Sair da conta">
    <ion-button class="exit-btn" color="danger" fill="solid" size="small">
      <span class="exit-text">Sair</span>
    </ion-button>
  </div>

  <ion-content class="ion-padding ion-text-center">
    <ion-segment [(ngModel)]="mode" color="warning" class="top-segment">
      <ion-segment-button value="focus">Foco</ion-segment-button>
      <ion-segment-button value="shortBreak">Descanso</ion-segment-button>
      <ion-segment-button value="longBreak">Pausa Longa</ion-segment-button>
    </ion-segment>

    <div class="time-display">
      {{ displayTime }}
    </div>

    <div class="controls-three">
      <ion-button class="action-btn" color="warning" (click)="toggleTimer()" type="button" aria-label="Iniciar/Pausar">
        <span class="action-text">{{ timerRunning ? 'Pausar' : 'Iniciar' }}</span>
      </ion-button>

      <ion-button class="action-btn" color="warning" (click)="resetTimer()" type="button" aria-label="Restaurar">
        <span class="action-text">Restaurar</span>
      </ion-button>

      <ion-button class="action-btn" color="warning" (click)="openSettings()" type="button" aria-label="Configurações">
        <span class="action-text">Configurações</span>
      </ion-button>
    </div>
  </ion-content>

  <ion-popover 
    [isOpen]="showPopover" 
    (ionPopoverDidDismiss)="closePopover()" 
    [event]="popoverEvent">
    
    <ion-content class="ion-padding popover-content">
      <div><strong>Minha Conta</strong></div>
      <div class="user-email">{{ userEmail }}</div>
      <ion-button expand="block" color="danger" (click)="logout()">Sair</ion-button>
    </ion-content>
  </ion-popover>
  `,
  styles: [`
    ion-content {
      --background: #000000 !important;
      color: #ffffff !important;
      position: relative;
    }

    ion-header ion-toolbar {
      --background: #000000;
      color: #ffffff;
    }

    ion-title, ion-toolbar, ion-header { color: #ffffff !important; }

    /* botão Sair fixo no topo direito */
    .top-right-btn {
      position: fixed;
      top: 10px;
      right: 10px;
      z-index: 2000;
      pointer-events: auto;
    }

    .exit-btn {
      --background: #ff3b30; /* vermelho */
      --background-hover: #e02a21;
      --background-activated: #c71914;
      --color: #ffffff;
      font-weight: 700;
      border-radius: 8px;
      height: 36px;
      padding: 0 14px;
    }

    .exit-text {
      font-size: 0.85rem;
      color: #ffffff;
    }

    /* segment */
    .top-segment { margin-top: 6px; }
    ion-segment-button { color: #ffffff !important; }

    .time-display {
      margin: 40px 0;
      font-size: 5rem;
      font-weight: 700;
      color: #ffffff;
    }

    .controls-three {
      display: flex;
      align-items: center;
      justify-content: center;
      gap: 16px;
      margin-top: 18px;
      flex-wrap: wrap;
    }

    .action-btn {
      --background: var(--ion-color-warning, #FFC107);
      --border-radius: 8px;
      --padding-start: 28px;
      --padding-end: 28px;
      height: 50px;
      min-width: 140px;
      display: flex;
      align-items: center;
      justify-content: center;
      text-transform: uppercase;
      font-weight: 700;
    }

    .action-text {
      color: #000000;
      font-size: 0.95rem;
      letter-spacing: 0.6px;
    }

    .popover-content {
      --background: #000000;
      color: #ffffff !important;
    }

    .user-email { color: #ffffff; margin: 8px 0 16px 0; }

    h1, p, div, strong { color: #ffffff; }

    @media (max-width: 600px) {
      .time-display { font-size: 4.2rem; }
      .action-btn { min-width: 120px; height: 46px; --padding-start: 18px; --padding-end: 18px; }
      .exit-btn { height: 34px; padding: 0 10px; }
      .exit-text { font-size: 0.78rem; }
    }

    @media (max-width: 420px) {
      .controls-three { gap: 10px; }
      .action-btn { min-width: 110px; font-size: 0.85rem; }
    }
  `]
})
export class PomodoroComponent {
  mode: 'focus' | 'shortBreak' | 'longBreak' = 'focus';
  timerRunning = false;
  timerId: any = null;
  timeLeft = 25 * 60;

  durations = {
    focus: 25 * 60,
    shortBreak: 5 * 60,
    longBreak: 15 * 60,
  };

  userEmail = 'usuario@exemplo.com';
  showPopover = false;
  popoverEvent: any = null;

  constructor(private modalCtrl: ModalController, private popoverCtrl: PopoverController) {}

  ngOnInit() { this.setTimeByMode(); }

  setTimeByMode() {
    this.timeLeft = this.durations[this.mode];
    this.pauseTimer();
  }

  get displayTime() {
    const m = Math.floor(this.timeLeft / 60);
    const s = this.timeLeft % 60;
    return `${m.toString().padStart(2,'0')}:${s.toString().padStart(2,'0')}`;
  }

  toggleTimer() {
    if (this.timerRunning) this.pauseTimer();
    else this.startTimer();
  }

  startTimer() {
    this.timerRunning = true;
    this.timerId = setInterval(() => {
      if (this.timeLeft > 0) this.timeLeft--;
      else this.pauseTimer();
    }, 1000);
  }

  pauseTimer() {
    clearInterval(this.timerId);
    this.timerRunning = false;
  }

  resetTimer() {
    this.setTimeByMode();
  }

  async openSettings() {
    const modal = await this.modalCtrl.create({
      component: SettingsModalComponent,
      componentProps: {
        pomodoro: this.durations.focus / 60,
        shortBreak: this.durations.shortBreak / 60,
        longBreak: this.durations.longBreak / 60,
      },
      backdropDismiss: false,
    });

    modal.onDidDismiss().then((res) => {
      if (res.data) {
        this.durations.focus = res.data.pomodoro * 60;
        this.durations.shortBreak = res.data.shortBreak * 60;
        this.durations.longBreak = res.data.longBreak * 60;
        this.setTimeByMode();
      }
    });

    await modal.present();
  }

  openPopover(event: any) {
    this.popoverEvent = event;
    this.showPopover = true;
  }

  closePopover() { this.showPopover = false; }

  logout() {
    alert('Logout efetuado');
    this.closePopover();
  }
}
