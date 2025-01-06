import {Selector} from "@ngxs/store";
import {TelegramModel, TelegramState} from "./telegram.state";

export class TelegramSelectors {

    @Selector([TelegramState])
    static getTgId(state: TelegramModel): number | null {
        if (state.tgID !== null) {
            return state.tgID;
        } else {
            return null;
        }
    }

    @Selector([TelegramState])
    static getTgUser(state: TelegramModel): any {
        return state.tgUser;
    }

    @Selector([TelegramState])
    static getTgColorScheme(state: TelegramModel): any {
        if (state.colorScheme) {
            return state.colorScheme;
        }
    }
}