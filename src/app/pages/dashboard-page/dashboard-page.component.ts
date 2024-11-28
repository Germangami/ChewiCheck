import { ChangeDetectionStrategy, Component } from '@angular/core';
import { ClientSubscriptionInfoComponent } from "../../components/client-subscription-info/client-subscription-info.component";

@Component({
  selector: 'app-dashboard-page',
  standalone: true,
  imports: [ClientSubscriptionInfoComponent],
  templateUrl: './dashboard-page.component.html',
  styleUrl: './dashboard-page.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DashboardComponent {

}
