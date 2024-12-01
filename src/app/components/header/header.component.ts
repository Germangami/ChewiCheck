import { Component, OnInit, inject } from '@angular/core';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import { TelegraService } from '../../shared/services/telegram';
import {MatMenuModule} from '@angular/material/menu';
import {MatCardModule} from '@angular/material/card';

export interface TelegramUser {
  allows_write_to_pm: boolean;
  first_name: string;
  id: number;
  language_code: string;
  last_name: string;
  photo_url: string;
  username: string;
}

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule, 
    MatButtonModule, 
    MatIconModule, 
    MatMenuModule, 
    MatCardModule
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent implements OnInit {

  telegramService: TelegraService = inject(TelegraService);

  tg: any;
  user: TelegramUser | undefined;

  ngOnInit() {
    this.tg = this.telegramService.initTelegramWebApp();
    this.user = this.tg?.initDataUnsafe?.user;
  }

  close() {
    this.tg.close();
  }
}
