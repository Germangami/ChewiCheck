import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { TelegraService } from './shared/services/telegram';
import { Store } from '@ngxs/store';
import { GetUsers } from './state/client/client.actions';
import { Observable } from 'rxjs';
import { ClientState, User } from './state/client/client.state';
import { ClientSelectors } from './state/client/client.selectors';
import { InitTelegramWebApp } from './state/telegram/telegram.actions';

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
  store = inject(Store);

  title = 'ChewiCheck';
  tg: any;

  ngOnInit() {
    this.initTelegramWebApp();
    this.initUserStore();
  }

  initTelegramWebApp() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      this.store.dispatch(new InitTelegramWebApp(window.Telegram.WebApp));
    } else {
      return;
    }
  }

  initUserStore() {
    this.store.dispatch(new GetUsers()).subscribe();
  }

}
