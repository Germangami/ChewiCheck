import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-owner-page',
  standalone: true,
  imports: [],
  templateUrl: './owner-page.component.html',
  styleUrl: './owner-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class OwnerPageComponent {

}
