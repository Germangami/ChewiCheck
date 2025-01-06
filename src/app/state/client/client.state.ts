import { Injectable, inject } from "@angular/core";
import {State, Action, StateContext} from "@ngxs/store";
import { ChangeUserNickName, GetUsers } from "./client.actions";
import { ApiService } from "../../shared/services/api.service";
import { catchError, of, tap } from "rxjs";

export interface ClientModel {
    users: User[];
}

export interface User {
    tgId?: number | null,
    first_name?: string | null,
    last_name?: string | null,
    username?: string | null,
    nickname?: string | null,
    startDate?: string | null,
    endDate?: string | null,
    remainingTrainings?: number | null,
    totalTrainings?: number | null,
    type?: string | null,
    membershipType?: string | null,
    attendanceHistory?: AttendanceHistory[] | null,
}

export interface AttendanceHistory {
    date: Date,
    time: string,
}

@State<ClientModel>({
    name: 'client',
    defaults: {
        users: []
    }
})
@Injectable()
export class ClientState {

    apiService = inject(ApiService);

    @Action(GetUsers)
    getUsers(ctx: StateContext<ClientModel>) {
        return this.apiService.getUsers().pipe(
            tap(response => {
                const state = ctx.getState();
                ctx.setState({
                    ...state,
                    users: response
                })
            })
        );
    }

    @Action(ChangeUserNickName)
    changeUserNickName(ctx: StateContext<ClientModel>, action: ChangeUserNickName) {
    const state = ctx.getState();
    const userToUpdate = state.users.find(user => user.tgId === action.tgId);

    if (!userToUpdate) {
        console.error('User not found');
        return;
    }

    const updatedUserData: Partial<User> = {
        tgId: action.tgId,
        nickname: action.nickName
    };

    // return this.apiService.updateUser(updatedUserData).pipe(
    //     tap(updatedUser => {
    //         const updatedUsers = state.users.map(user =>
    //             user.tgId === updatedUser.tgId ? { ...user, nickname: updatedUser.nickname } : user
    //         );

    //         ctx.patchState({ users: updatedUsers });
    //     }),
    //     catchError(error => {
    //         console.error('Failed to update user in DB:', error);
    //         return of(null);
    //     })
    // ).subscribe();
}
}