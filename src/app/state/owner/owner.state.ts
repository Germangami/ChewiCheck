import { Injectable } from "@angular/core";
import {State} from "@ngxs/store";

export interface OwnerModel {
    ownerId: number;
    clients: any;
}




@State<OwnerModel>({
    name: 'owner',
    defaults: {
        ownerId: 469408413,
        clients: [
            {
                name: 'Sasha'
            },
            {
                name: 'Vania',
            },
            {
                name: 'Kuba'
            }
        ]
    }
})
@Injectable()
export class OwnerState {

}