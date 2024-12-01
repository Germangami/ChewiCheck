import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {MatButtonModule} from '@angular/material/button';
import {MatCardModule} from '@angular/material/card';
import { ClientModel } from '../../state/client/client.state';

@Component({
  selector: 'app-client-subscription-info',
  standalone: true,
  imports: [MatCardModule, MatButtonModule],
  templateUrl: './client-subscription-info.component.html',
  styleUrl: './client-subscription-info.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ClientSubscriptionInfoComponent {

  @Input()
  client: ClientModel | undefined;
}
