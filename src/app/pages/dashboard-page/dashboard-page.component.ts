import {ChangeDetectionStrategy, ChangeDetectorRef, Component, OnInit, inject, model} from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApiService } from '../../shared/services/api.service';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [
    MatCardModule,
    ClientSubscriptionInfoComponent, 
    ClientListComponent,
    DatepickerComponent,
    CommonModule,
    MatFormFieldModule, MatInputModule, MatIconModule,
    MatCardModule, MatDatepickerModule,
    MatButtonModule
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

  users$: Observable<User[]> = this.store.select(ClientSelectors.getUsers);
  tgId$: Observable<any | null> = this.store.select(TelegramSelectors.getTgId);
  tgColorScheme$: Observable<any> = this.store.select(TelegramSelectors.getTgColorScheme);

  users: User[];
  tgId: number;
  currentUser: User;
  isDateSelected: boolean;

  selected = model<Date | null>(null);

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

  markAttendance() {
    if (this.currentUser.tgId) {
      const tgId: number = this.tgId;
      this.apiService.markAttendance(tgId).subscribe({
        next: (response) => console.log('Успех:', response),
        error: (error) => console.error('Ошибка:', error.error.message),
      });
    }
  }

  myFilter = (d: Date | null): boolean => {
    const day = (d || new Date()).getDay();
    return day !== 2 && day !== 4 && day !== 6 && day !== 0;
  };
}
