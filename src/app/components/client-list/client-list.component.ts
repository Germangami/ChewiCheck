import {ChangeDetectionStrategy, Component, inject, viewChild} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatAccordion, MatExpansionModule} from '@angular/material/expansion';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatIconModule} from '@angular/material/icon';
import {MatInputModule} from '@angular/material/input';
import {MatCardModule} from '@angular/material/card';
import { ClientSubscriptionInfoComponent } from '../client-subscription-info/client-subscription-info.component';
import { ApiService, User } from '../../shared/services/api.service';

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
    ClientSubscriptionInfoComponent
  ],
  templateUrl: './client-list.component.html',
  styleUrl: './client-list.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientListComponent {

  apiService = inject(ApiService);

  users: User[];

  ngOnInit() {
    this.showUser();
  }

  showUser() {
    this.apiService.showUser().subscribe((response: User[]) => {
      this.users = response;
      console.log(this.users, 'USERS!')
    });
  }

}
