import { ClientModel, ClientState, User } from "./client.state";
import {Selector} from "@ngxs/store";

export class ClientSelectors {

    @Selector([ClientState])
    static getUsers(state: ClientModel): User[] {
        return state.users;
    }
}