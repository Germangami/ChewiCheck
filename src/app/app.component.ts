import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterModule, RouterOutlet } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { ApiService } from './shared/services/api.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent {

  title = 'ChewiCheck';

  constructor(private ApiService: ApiService) {

  }

  ngOnInit() {
    if (window.Telegram.WebApp) {
      window.Telegram.WebApp.ready();
    }
  }

  createUser() {
    console.log('CREATE USER CLICK!')
    const user = {
      author: "TEST USER",
      title: "TEST USER",
      content: "Send new http post"
    }
    this.ApiService.createNewUser(user).subscribe(response => {
      console.log(response, 'RESPONSE!')
    })
  }

}
