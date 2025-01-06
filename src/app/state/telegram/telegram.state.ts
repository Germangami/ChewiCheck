import { Injectable } from "@angular/core";
import {State, Action, StateContext} from "@ngxs/store";
import {InitTelegramWebApp} from "./telegram.actions";

export interface TelegramModel {
    colorScheme: string;
    tgUser: any | null;
    tgID: number;
}

@State<TelegramModel>({
    name: 'telegram',
})
@Injectable()
export class TelegramState {

    @Action(InitTelegramWebApp)
    initTelegramWebApp(ctx: StateContext<TelegramModel>, action: any) {
        const { colorScheme, initDataUnsafe } = action.telegramWebApp;
        const tgUser = initDataUnsafe.user;
        const tgID = tgUser?.id;

        const state = ctx.getState();
        ctx.patchState({
            colorScheme,
            tgUser,
            tgID,
        });
    }
}