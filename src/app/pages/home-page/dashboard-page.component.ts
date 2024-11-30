import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {ClientSubscriptionInfoComponent} from "../../components/client-subscription-info/client-subscription-info.component";
import {ClientListComponent} from '../../components/client-list/client-list.component';
import {MatCardModule} from '@angular/material/card';
import {TelegraService} from '../../shared/services/telegram';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ClientSubscriptionInfoComponent, ClientListComponent, MatCardModule],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  telegramService = inject(TelegraService).initTelegramWebApp();

  ngOnInit(): void {
    console.log(this.telegramService, 'TELEGRAM SERVICE');
  }
  
}
