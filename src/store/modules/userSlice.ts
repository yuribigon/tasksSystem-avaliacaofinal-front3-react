import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { DeleteTask, EditTask, NewTask } from "../../types/tasks";
import { NewUser, User, Users } from "../../types/users";

const initialState : Users = {
    users: [],
};
export const userSlice = createSlice({
    name: "accountsHandler",
    initialState,
    reducers: {
        addUser: (state, action : PayloadAction<NewUser>) => {
            state.users.push({
                id: crypto.randomUUID(),
                name: action.payload.name,
                email: action.payload.email,
                password: action.payload.password,
                tasks: []
            });
        },
        deleteUser: (state, action : PayloadAction<string>) => {
            const index : number = state.users.findIndex((user : User) => user.id === action.payload);
            state.users.splice(index, 1);
        },
        addTask: (state, action : PayloadAction<NewTask>) => {
            const index = state.users.findIndex((user) => user.id === action.payload.userID);
            state.users[index].tasks.push({
                id: crypto.randomUUID(),
                title: action.payload.title,                
                description: action.payload.description,
            });
        },
        editTask: (state, action : PayloadAction<EditTask>) => {
            const userIndex = state.users.findIndex((user) => user.id === action.payload.userID); 
            const taskIndex = state.users[userIndex].tasks.findIndex((task) => task.id === action.payload.taskID);
            state.users[userIndex].tasks[taskIndex] = {
                id: action.payload.taskID,
                title: action.payload.title,
                description: action.payload.description
            }
        },
        deleteTask: (state, action : PayloadAction<DeleteTask>) => {
            const userIndex = state.users.findIndex((user) => user.id === action.payload.userID);
            const taskIndex = state.users[userIndex].tasks.findIndex((task) => task.id === action.payload.taskID);
            state.users[userIndex].tasks.splice(taskIndex, 1);           
        },
    }
})
export const { addUser, deleteUser, deleteTask, editTask, addTask } = userSlice.actions;
export default userSlice.reducer;