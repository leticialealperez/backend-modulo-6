import { IUser } from "../../../user/domain/model/user";

export interface ITask {
    uid?: string;
    description: string;
    details: string;
    user: IUser;
}