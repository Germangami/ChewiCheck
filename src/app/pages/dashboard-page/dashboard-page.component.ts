import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import {ClientSubscriptionInfoComponent} from "../../components/client-subscription-info/client-subscription-info.component";
import {ClientListComponent} from '../../components/client-list/client-list.component';
import {MatCardModule} from '@angular/material/card';
import {TelegraService} from '../../shared/services/telegram';
import {Store} from '@ngxs/store';
import { Observable, map, tap } from 'rxjs';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { ApiService, User } from '../../shared/services/api.service';

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
  apiService = inject(ApiService);
  store = inject(Store);
  changeDetectorRef = inject(ChangeDetectorRef);

  clients$: Observable<User[]> = this.apiService.showUser();
  users: User[];
  tgId: number;
  currentUser: User | undefined;
  tg: any;

  ngOnInit(): void {
    this.tgId = this.telegramService.initDataUnsafe.user.id;
    this.clients$.pipe(
      // map(users => users.filter(user => user.type === 'Client'))
    ).subscribe(users => {
      console.log(users,'USERS')
      this.users = users;
      const foundUser = this.users.find(item => item.tgId === this.tgId);
      this.currentUser = foundUser ? { ...foundUser } : undefined;
      this.changeDetectorRef.detectChanges();
    });
  }
}
