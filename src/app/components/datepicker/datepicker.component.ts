import {ChangeDetectionStrategy, Component, inject, model} from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {provideNativeDateAdapter} from '@angular/material/core';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatDividerModule} from '@angular/material/divider';
import {MatButtonModule} from '@angular/material/button';
import {Store} from '@ngxs/store'
import { SelectedTraningDate } from '../../state/client/client.actions';
import { CommonModule } from '@angular/common';
import moment from 'moment';

@Component({
  selector: 'app-datepicker',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatCardModule, MatDatepickerModule, MatButtonModule, MatDividerModule, CommonModule],
  templateUrl: './datepicker.component.html',
  styleUrl: './datepicker.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DatepickerComponent {
  store = inject(Store);

  selected = model<Date | null>(null);
  isDateSelected: boolean;

  selectedCurrentDate() {
    const currentDate = moment();
    const selectedDate = moment(this.selected());

    if (currentDate.isSame(selectedDate, 'day')) {
      this.isDateSelected = true;
      this.store.dispatch(new SelectedTraningDate(this.selected()));
    } else {
      this.isDateSelected = false;
      console.log('ЧТО- ТО ПОШЛО НЕ ТАК!!??!?!')
    }
  }
}
