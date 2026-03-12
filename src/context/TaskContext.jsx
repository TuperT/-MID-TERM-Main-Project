import { createContext } from "react";

export const initialTaskState = {
    totalTask: 0,
    completeTask: 0,
    pendingTask: 0,
    progressTask: 0,
    tasks: [],
}

export const TaskContext = createContext()