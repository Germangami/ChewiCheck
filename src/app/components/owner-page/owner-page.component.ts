import { ChangeDetectionStrategy, Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-owner-page',
  standalone: true,
  imports: [MatCardModule],
  templateUrl: './owner-page.component.html',
  styleUrl: './owner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnerPageComponent {

}
