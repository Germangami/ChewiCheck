import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TelegraService {

    initTelegramWebApp() {
            const telegramWebApp = window.Telegram.WebApp;
            return telegramWebApp;
    }
}