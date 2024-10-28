import { ChangeDetectionStrategy, Component } from '@angular/core';
import {MatCardModule} from '@angular/material/card';

@Component({
  selector: 'app-client-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './client-page.component.html',
  styleUrl: './client-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientPageComponent {

}
