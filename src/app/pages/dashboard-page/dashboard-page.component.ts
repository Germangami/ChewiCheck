import {ChangeDetectionStrategy, Component, OnInit, inject} from '@angular/core';
import {ClientSubscriptionInfoComponent} from "../../components/client-subscription-info/client-subscription-info.component";
import {ClientListComponent} from '../../components/client-list/client-list.component';
import {MatCardModule} from '@angular/material/card';
import {TelegraService} from '../../shared/services/telegram';
import {Store} from '@ngxs/store';
import { Observable } from 'rxjs';
import { ClientSelectors } from '../../state/client/client.selectors';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { ClientModel } from '../../state/client/client.state';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatCardModule,
    ClientSubscriptionInfoComponent, 
    ClientListComponent,
    DatepickerComponent
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  telegramService = inject(TelegraService).initTelegramWebApp();
  store = inject(Store);

  clients$: Observable<ClientModel> = this.store.select(ClientSelectors.getClients);
  client: ClientModel;

  ngOnInit(): void {
    this.clients$.subscribe(clientData => {
      this.client = clientData;
    })
  }
  
}
