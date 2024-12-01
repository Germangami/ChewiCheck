import {Selector} from "@ngxs/store";
import { OwnerModel, OwnerState } from "./owner.state";

export class OwnerClientsSelector {
    @Selector([OwnerState])
    static getClients(state: OwnerModel): any {
        return state;
    }
}