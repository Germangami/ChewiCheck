import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject} from '@angular/core';
import {ClientSubscriptionInfoComponent} from "../../components/client-subscription-info/client-subscription-info.component";
import {ClientListComponent} from '../../components/client-list/client-list.component';
import {MatCardModule} from '@angular/material/card';
import {TelegraService} from '../../shared/services/telegram';
import {Store} from '@ngxs/store';
import { Observable, map, tap } from 'rxjs';
import { DatepickerComponent } from '../../components/datepicker/datepicker.component';
import { User } from '../../state/client/client.state';
import { ClientSelectors } from '../../state/client/client.selectors';
import { TelegramSelectors } from '../../state/telegram/telegram.selectors';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [
    MatCardModule,
    ClientSubscriptionInfoComponent, 
    ClientListComponent,
    DatepickerComponent,
    CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule
  ],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent implements OnInit {
  telegramService = inject(TelegraService).initTelegramWebApp();
  store = inject(Store);
  changeDetectorRef = inject(ChangeDetectorRef);

  users$: Observable<User[]> = this.store.select(ClientSelectors.getUsers);
  tgId$: Observable<any | null> = this.store.select(TelegramSelectors.getTgId);
  tgColorScheme$: Observable<any> = this.store.select(TelegramSelectors.getTgColorScheme);

  users: User[];
  tgId: number;
  currentUser: User;

  ngOnInit(): void {
    this.getUsers();
    this.getTgId();
  }

  getUsers() {
    this.users$.pipe(
      // map(users => users.filter(user => user.type === 'Client'))
    ).subscribe((users: User[]) => {
      this.users = users;
      this.getCurrentUser();
      this.changeDetectorRef.detectChanges();
    })
  }

  getTgId() {
    this.tgId$.subscribe(tgId => {
      this.tgId = tgId;
    });
  }

  getCurrentUser() {
    if (this.users.length > 0 && this.tgId) {
      const foundUser = this.users.find(item => item.tgId === this.tgId);
      if (foundUser) {
        this.currentUser = foundUser;
      }
    }
  }
}
