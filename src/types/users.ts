import { TaskType } from "./tasks";

export interface User{
    id: string,
    name: string,
    email: string,
    password: string;
    tasks: TaskType[];
}

export interface Users {
    users: Array<User>,
};

export interface LoggedType {
    loggedUserID: string | undefined
};

export interface NewUser {
    name: string,
    email: string,
    password: string,
};