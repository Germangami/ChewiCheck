export class GetUsers {
    static readonly type = '[Client] get users';
}

export class ChangeUserNickName {
    static readonly type = '[Client] change user nickname';

    constructor(public nickName: string, public tgId: number) {

    }
}