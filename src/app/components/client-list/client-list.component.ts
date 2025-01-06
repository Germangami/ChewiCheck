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
import { TelegraService } from '../../shared/services/telegram';
import { CommonModule } from '@angular/common';
import { User } from '../../state/client/client.state';

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
  telegramService = inject(TelegraService);

  @Input()
  set usersList(users: User[]) {
    this.users = users;
  }

  @Input()
  set getCurrentUser(currentUser: User) {
    this.currentUser = currentUser;
  }

  @Input()
  set getColorScheme(colorScheme: string) {
    this.colorScheme = colorScheme;
  };

  users: User[];
  currentUser: User;
  colorScheme: string;
}
