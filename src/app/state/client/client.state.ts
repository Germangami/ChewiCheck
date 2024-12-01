import { Injectable } from "@angular/core";
import {State, Action, StateContext} from "@ngxs/store";
import { SelectedTraningDate } from "./client.actions";

export interface ClientModel {
    id: number;
    first_name: string;
    last_name: string;
    startDate: any;
    endDate: any;
    remainingTrainings: number;
    totalTrainings: number;
    visitedDates: string[]
}

@State<ClientModel>({
    name: 'client',
    defaults: {
        id: 1,
        first_name: 'Ivan',
        last_name: 'Kupalow',
        startDate: '01.12.2024',
        endDate: '31.12.2024',
        remainingTrainings: 12,
        totalTrainings: 12,
        visitedDates: []
    }
})
@Injectable()
export class ClientState {

    @Action(SelectedTraningDate)
    selectedTraningDate(ctx: StateContext<ClientModel>, action: any) {
        const state = ctx.getState();
        ctx.patchState({
            ...state,
            remainingTrainings: state.remainingTrainings - 1
        })
    }

}