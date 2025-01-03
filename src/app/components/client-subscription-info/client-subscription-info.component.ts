import {ChangeDetectionStrategy, ChangeDetectorRef, Component, Input, inject} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import {MatInputModule} from '@angular/material/input';
import {MatSelectChange, MatSelectModule} from '@angular/material/select';
import {MatFormFieldModule} from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { ApiService, User } from '../../shared/services/api.service';

@Component({
  selector: 'app-client-subscription-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule, MatInputModule, MatSelectModule, MatFormFieldModule, CommonModule],
  templateUrl: './client-subscription-info.component.html',
  styleUrl: './client-subscription-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSubscriptionInfoComponent {

  apiService = inject(ApiService);
  changeDetectorRef = inject(ChangeDetectorRef);
  selectedValue: string;

  @Input()
  client: User | undefined;

  @Input()
  set currentUser(user: User | undefined) {
    if(user) {
      this.client = user;
    }
  };

  ngOnInit() {
  }

  aboniments: {value: string, viewValue: string}[] = [
    {value: 'basic', viewValue: '200 zł'},
    {value: 'premium', viewValue: '300 zł'},
  ];


  test(event: MatSelectChange) {
    const selectedValue = event.value;
    const membershipType = selectedValue;
    const membershipData = this.calculateMembership(membershipType, this.client?.tgId ?? 0);
    
    if (this.client) {
      this.apiService.updateUser(membershipData).subscribe({
        next: (val) => {
          console.log('Данные обновлены:', val);
          this.client = { ...this.client, ...val };
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
