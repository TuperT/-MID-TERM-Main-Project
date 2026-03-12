import { TaskContext, initialTaskState } from "./TaskContext"
import { taskReducer } from "../reducers/taskReducer"
import { useReducer, useCallback } from "react"

export const TaskProvider = ({ children }) => {
    const [state, dispatch] = useReducer(taskReducer, initialTaskState)

    const addTask = useCallback((taskData) => {
        dispatch({ 
            type: "ADD_TASK", 
            payload: taskData 
        })
    }, [])

    const CompleteTask = useCallback((taskId) => {
        dispatch({ 
            type: "COMPLETE_TASK", 
            payload: taskId 
        })
    }, [])

    const UndoTask = useCallback((taskId) => {
        dispatch({ 
            type: "UNDO_TASK", 
            payload: taskId 
        })
    }, [])

    const DeletePendingTask = useCallback((taskId) => {
        dispatch({ 
            type: "DELETE_PENDING_TASK", 
            payload: taskId 
        })
    }, [])

    const DeleteCompleteTask = useCallback((taskId) => {
        dispatch({ 
            type: "DELETE_COMPLETE_TASK", 
            payload: taskId 
        })
    }, [])

    const DeleteTask = useCallback((taskId, status) => {
        if (status === 'pending') {
            dispatch({ type: "DELETE_PENDING_TASK", payload: taskId })
        } else {
            dispatch({ type: "DELETE_COMPLETE_TASK", payload: taskId })
        }
    }, [])

    const value = {
        state,
        dispatch,
        addTask,
        CompleteTask,
        UndoTask,
        DeletePendingTask,
        DeleteCompleteTask,
        DeleteTask,
    }

    return (
        <TaskContext.Provider value={value}>
            {children}
        </TaskContext.Provider>
    )
}