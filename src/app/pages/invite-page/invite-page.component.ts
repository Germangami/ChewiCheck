import { Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';
import {MatButtonModule} from '@angular/material/button';


@Component({
  selector: 'app-invite-page',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './invite-page.component.html',
  styleUrl: './invite-page.component.scss'
})
export class InvitePageComponent {

}
