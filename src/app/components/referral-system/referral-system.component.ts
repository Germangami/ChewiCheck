import { CommonModule } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { Component, inject } from '@angular/core';
import { postEvent } from '@telegram-apps/sdk';
import { TelegraService } from '../../shared/services/telegram';

@Component({
  selector: 'app-referral-system',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './referral-system.component.html',
  styleUrl: './referral-system.component.scss'
})
export class ReferralSystemComponent {
  telegramService = inject(TelegraService).initTelegramWebApp();
  http = inject(HttpClient);

  userId: number; // Замените на актуальный ID пользователя
  referredId: string | null = '469408413'; // Здесь будет ID пригласившего
  referrals: string[] = [];
  referrer: string | null = null;
  INVITE_URL = "https://t.me/ChewiCheckBot/start"

  ngOnInit(): void {
    this.userId = this.telegramService.initDataUnsafe.user.id;
    this.checkReferral();
    this.fetchReferrals();
  }

  checkReferral(): void {
    if (this.referredId && this.userId) {
      this.http.post('/api/referrals', { userId: this.userId, referrerId: this.referredId }).subscribe({
        next: () => console.log('Referral saved successfully'),
        error: (error) => console.error('Error saving referral:', error),
      });
    }
  }

  fetchReferrals(): void {
    if (this.userId) {
      this.http.get(`/api/referrals?userId=${this.userId}`).subscribe({
        next: (data: any) => {
          this.referrals = data.referrals;
          this.referrer = data.referrer;
        },
        error: (error) => console.error('Error fetching referrals:', error),
      });
    }
  }

  handleInviteFriend(): void {
    const inviteLink = `${this.INVITE_URL}?startapp=${this.userId}`;
    const shareText = 'Join me on this awesome Telegram mini app!';
    const fullUrl = `https://t.me/share/url?url=${encodeURIComponent(inviteLink)}&text=${encodeURIComponent(shareText)}`;
    window.open(fullUrl, '_blank');
  }

  handleCopyLink(): void {
    const inviteLink = `${this.INVITE_URL}?startapp=${this.userId}`;
    navigator.clipboard.writeText(inviteLink).then(() => {
      alert('Invite link copied to clipboard!');
    });
  }

  showUser() {
    this.http.get(`http://localhost:5000/api/referrals`).subscribe(x => {
      console.log(x, 'SHOW USER!')
    })
  }
}
