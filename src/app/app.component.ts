import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TelegraService } from './shared/services/telegram';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {
  telegramService = inject(TelegraService);

  title = 'ChewiCheck';
  tg: any;
  colorScheme: string;

  ngOnInit() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      this.tg = this.telegramService.initTelegramWebApp();
      this.colorScheme = this.tg.colorScheme;
      console.log(this.colorScheme, 'CHECK CHECK')
    };
  }

}
