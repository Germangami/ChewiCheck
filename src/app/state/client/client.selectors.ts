import { ClientModel, ClientState } from "./client.state";
import {Selector} from "@ngxs/store";

export class ClientSelectors {
    @Selector([ClientState])
    static getClients(state: ClientModel): ClientModel {
        return state;
    }
}