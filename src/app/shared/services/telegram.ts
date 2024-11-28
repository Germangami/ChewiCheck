import { Injectable } from "@angular/core";

@Injectable({
    providedIn: 'root'
})
export class TelegraService {

    initTelegramWebApp() {
        if (window.Telegram.WebApp) {
            const telegramWebApp = window.Telegram.WebApp;
            return telegramWebApp;
        }
    }
}