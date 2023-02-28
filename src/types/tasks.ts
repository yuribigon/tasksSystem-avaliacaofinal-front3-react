export interface TaskType{
    id: string;
    title: string;
    description: string;
}

export interface NewTask {
    userID?: string,
    title: string,
    description: string
}

export type EditTask = NewTask & DeleteTask;

export interface DeleteTask {
    userID : string,
    taskID: string
}

export interface TaskInfos {
    userId: string
}

export interface TaskInfoType {
    userId: string,
    id: string,
    title: string,
    description: string
}