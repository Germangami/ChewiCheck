import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, Output, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ApiService } from '../../shared/services/api.service';
import { MatIconModule } from '@angular/material/icon';
import { User } from '../../state/client/client.state';
import {Store} from '@ngxs/store';
import { ChangeUserNickName } from '../../state/client/client.actions';
import { EventEmitter } from 'stream';

@Component({
  selector: 'app-client-subscription-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, CommonModule, MatIconModule],
  templateUrl: './client-subscription-info.component.html',
  styleUrl: './client-subscription-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSubscriptionInfoComponent {

  store = inject(Store);
  apiService = inject(ApiService);
  changeDetectorRef = inject(ChangeDetectorRef);

  @Input()
  set getCurrentUser(user: User) {
    if (user) {
      this.currentUser = user;
      console.log(this.user, 'USER CHECK')
    }
  }

  @Input()
  set getUserFromList(user: User) {
    if (user) {
      this.user = user;
    }
  }

  user: User;
  currentUser: User;
  selectedValue: string;
  isNickNameChange = false;
  isNoteChange = false;
  aboniments: {value: string, viewValue: string}[] = [
    {value: 'basic', viewValue: '200 zł'},
    {value: 'premium', viewValue: '300 zł'},
  ];
  newNickName: string;
  newNote: string;

  addUserNickName(event: any) {
    this.newNickName = event.target.value;
  }

  addUserNote(event: any) {
    this.newNote = event.target.value;
  }

  changeUserNickName(event: Event) {
    if (this.currentUser.type === 'Coach') {
      event.stopPropagation()
      this.isNickNameChange = !this.isNickNameChange;
    }
  }

  changeUserNote(event: Event) {
    if (this.currentUser.type === 'Coach') {
      event.stopPropagation()
      this.isNoteChange = !this.isNoteChange;
    }
  }

  saveChangeUserData() {
    if (this.user.tgId && this.newNickName) {
      // this.store.dispatch(new ChangeUserNickName(this.newNickName, this.user.tgId));

      this.user.nickname = this.newNickName;
      
      this.apiService.updateUser(this.user).subscribe({
        next: (val) => {
          console.log('Данные обновлены:', val);
        },
        error: (error) => {
          console.error('Ошибка при обновлении данных:', error);
        },
      });
    }
  }

  saveUserNote() {
    if (this.user.tgId && this.newNote) {
        this.user.note = this.newNote;

        this.apiService.updateUser(this.user).subscribe({
          next: (val) => {
            console.log('Данные обновлены:', val);
          },
          error: (error) => {
            console.error('Ошибка при обновлении данных:', error);
          },
        });
    }
  }

  test(event: MatSelectChange) {
    const selectedValue = event.value;
    const membershipType = selectedValue;
    const membershipData = this.calculateMembership(membershipType, this.user?.tgId ?? 0);
    
    if (this.user) {
      this.apiService.updateUser(membershipData).subscribe({
        next: (val) => {
          console.log('Данные обновлены:', val);
          this.user = { ...this.user, ...val };
          this.changeDetectorRef.detectChanges()
        },
        error: (error) => {
          console.error('Ошибка при обновлении данных:', error);
        },
        complete: () => {}
      })
    }  
  }
 
  calculateMembership(type: string, tgId: number) {
    const startDate = new Date();
    const endDate = new Date();
    endDate.setMonth(startDate.getMonth() + 1);
    
    const totalTrainings = type === 'basic' ? 8 : 12;
  
    return {
      tgId: tgId,
      startDate: startDate.toLocaleDateString('pl-PL'),
      endDate: endDate.toLocaleDateString('pl-PL'),
      totalTrainings,
      remainingTrainings: totalTrainings,
      membershipType: type
    };
  }
}
