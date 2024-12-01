export class GetClients {
    static readonly type = '[Client] get clients';
}

export class SelectedTraningDate {
    static readonly type = '[Client] selected traning date';

    constructor(public selectedDate: any) {}
}