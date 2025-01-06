import {ChangeDetectionStrategy, Component, Input, OnInit, inject, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import { CommonModule } from '@angular/common';
import moment from 'moment';
import { ApiService } from '../../shared/services/api.service';
import { User } from '../../state/client/client.state';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, MatButtonModule, MatDividerModule, CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent implements OnInit {
  apiService = inject(ApiService);

  user: User;

  @Input() 
  set currentUser(user: User | undefined) {
    if (user) {
      this.user = user;
    }
  };

  selected = model<Date | null>(null);
  isDateSelected: boolean;

  ngOnInit(): void {
  }

  markAttendance() {
    if (this.user.tgId) {
      const tgId: number = this.user.tgId;
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
