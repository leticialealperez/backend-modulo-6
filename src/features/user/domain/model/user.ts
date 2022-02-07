import { ITask } from "../../../task/domain/model/task";

export interface IUser {
    uid: string;
    login: string;
    password: string;
    tasks?: ITask[];
}
