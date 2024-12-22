import { Component, inject } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';
import { ApiService } from '../../shared/services/api.service';


@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss'
})
export class InvitePageComponent {
  apiServise = inject(ApiService);

  INVITE_URL = "https://t.me/ChewiCheckBot/start";
  
  handleInviteClient() {
    window.open(`https://t.me/share/url?url=https://t.me/ChewiCheckBot?start=ref_736456922`);
  }

  handleInviteCoach() {
    window.open(`https://t.me/share/url?url=https://t.me/ChewiCheckBot?start=createCoach`);
  }
}
