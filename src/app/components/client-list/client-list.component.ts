import {ChangeDetectionStrategy, Component, Input, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import {ClientSubscriptionInfoComponent} from '../client-subscription-info/client-subscription-info.component';
import {User} from '../../shared/services/api.service';
import { TelegraService } from '../../shared/services/telegram';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-list',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatButtonModule,
    MatExpansionModule,
    MatIconModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    MatCardModule,
    ClientSubscriptionInfoComponent,
    CommonModule
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {

  @Input()
  users: User[];
  telegramService = inject(TelegraService);

  title = 'ChewiCheck';
  tg: any;
  colorScheme: string;
  isDarkTheme = false;

  ngOnInit() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
      this.tg = this.telegramService.initTelegramWebApp();
      this.isDarkTheme = this.tg.colorScheme === 'dark';
      console.log(this.colorScheme, 'CHECK CHECK CHECK !@#!@#!@3213123123!')
    };
  }
}
