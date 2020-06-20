import { RouterContext } from "koa-router";

export interface ictx extends RouterContext {
    session: iSession;
    Success(data?: any): any;
    Error(msg: string, code?: number): any;
}
interface iSession {
    user: IUser;
}

interface IUser {
    id: number;
    user_type: number;
    tell: string;
    nickname: string;
    status: number;
}
