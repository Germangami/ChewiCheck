import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './shared/services/api.service';
import { TelegraService } from './shared/services/telegram';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'ChewiCheck';
  ApiService = inject(ApiService);
  telegramService = inject(TelegraService);
  http = inject(HttpClient);

  tg: any;
  user: {first_name: string, last_name: string, id: number} = {
    first_name: 'Ivan',
    last_name: 'Kolobkow',
    id: 3333
  }

  ngOnInit() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      this.tg = this.telegramService.initTelegramWebApp();
    };
  }

}
