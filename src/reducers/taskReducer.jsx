export const taskReducer = (state, action) => {
    switch(action.type) {
        case "ADD_TASK":
            return {
                ...state,
                totalTask: state.totalTask + 1,
                pendingTask: state.pendingTask + 1,
                tasks: [...state.tasks, { 
                    ...action.payload, 
                    id: Date.now().toString(),
                    completed: false 
                }]
            }

        case "COMPLETE_TASK":
            return {
                ...state,
                pendingTask: state.pendingTask - 1,
                completeTask: state.completeTask + 1,
                tasks: state.tasks.map(task => 
                    task.id === action.payload ? {...task, completed: true} : task
                )
            }

        case "UNDO_TASK":
            return {
                ...state,
                completeTask: state.completeTask - 1,
                pendingTask: state.pendingTask + 1,
                tasks: state.tasks.map(task => 
                    task.id === action.payload ? {...task, completed: false} : task
                )
            }

        case "DELETE_PENDING_TASK":
            return {    
                ...state,
                totalTask: state.totalTask - 1,
                pendingTask: state.pendingTask - 1,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }

        case "DELETE_COMPLETE_TASK":
            return {
                ...state,
                totalTask: state.totalTask - 1,
                completeTask: state.completeTask - 1,
                tasks: state.tasks.filter(task => task.id !== action.payload)
            }
            
        default:
            return state;
    }
}