import '../styles/Tasks.css'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import { TaskContext } from '../context/TaskContext'
import { useContext, useState } from 'react'

const Tasks = () => {
    const [error, setError] = useState("")
    const [filter, setFilter] = useState("all")
    
    const { state: authState } = useContext(AuthContext)
    const { state: taskState, addTask, CompleteTask, DeleteTask, UndoTask } = useContext(TaskContext)

    const userEmail = authState?.user || 'student'
    const totalTask = taskState?.totalTask || 0
    const completeTask = taskState?.completeTask || 0
    const pendingTask = taskState?.pendingTask || 0
    const tasks = taskState?.tasks || []

    const [formData, setFormData] = useState({
        taskTitle: "",
        taskCategory: "",
        taskPriority: "",
        completed: false,
    })

    function handleSubmit(e) {
        e.preventDefault()

        if(formData.taskTitle === "") {
            setError("Title is Required")
        } else if(formData.taskCategory === "") {
            setError("Category must be selected")
        } else if(formData.taskPriority === "") {
            setError("Priority must be chosen")
        } else {
            addTask(formData)
            setFormData({
                taskTitle: "",
                taskCategory: "",
                taskPriority: "",
                completed: false,
            }) 
            setError("")
        }
    }

    function handleChange(e) {
        const { name, value } = e.target

        setFormData((prev) => ({
            ...prev,
            [name]: value,
        }))
    }

    const filteredTasks = tasks.filter(task => {    
        if (filter === "pending") return !task.completed
        if (filter === "completed") return task.completed
        return true
    })

    return (
        <main>
            <Navbar />

            <div id="task-container">
                <div id="title">
                    <p id="mini-title">TASK MANAGER</p>
                    <p id="main-title">My Tasks</p>
                    <p id="email-subtitle">{userEmail}</p>
                </div>

                <form id="task-form" onSubmit={handleSubmit}>
                    <p id="form-main-title">Add New Task</p>
                    
                    {error && <p id="form-error">{error}</p>}

                    <div id="task-form-title">
                        <label htmlFor="taskTitle">TASK TITLE</label>
                        <input type="text" name="taskTitle" id='input' 
                        placeholder='What needs to be done?' 
                        value={formData.taskTitle} onChange={handleChange} />
                    </div>

                    <div id='both-container'>
                        <div id="task-form-category">
                            <label htmlFor="taskCategory">CATEGORY</label>
                            <select name="taskCategory" id='input-selector' 
                            onChange={handleChange} value={formData.taskCategory}>
                                <option value="" disabled>Select category...</option>
                                <option value="STUDY">STUDY</option>
                                <option value="WORK">WORK</option>
                                <option value="HEALTH">HEALTH</option>
                            </select>
                        </div>

                        <div id="task-form-priority">
                            <div>
                                <label htmlFor="taskPriority" id='taskPriority'>PRIORITY</label>

                                <div className="priority-buttons">
                                    <label><input type="radio" name="taskPriority" value="LOW"
                                        onChange={handleChange} checked={formData.taskPriority === "LOW"}/> Low</label>

                                    <label><input type="radio" name="taskPriority" value="MEDIUM"
                                        onChange={handleChange} checked={formData.taskPriority === "MEDIUM"}/> Medium</label>

                                    <label><input type="radio" name="taskPriority" value="HIGH"
                                        onChange={handleChange} checked={formData.taskPriority === "HIGH"}/> High</label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <button type="submit" id="submit-button">+ Add Task</button>
                </form>
                
                <div id="task-filter">
                    <button className={`filter-btn ${filter === "all" ? "active" : ""}`} 
                        onClick={() => setFilter("all")}>All ({totalTask})</button>
                    <button className={`filter-btn ${filter === "pending" ? "active" : ""}`} 
                        onClick={() => setFilter("pending")}>Pending ({pendingTask})</button>
                    <button className={`filter-btn ${filter === "completed" ? "active" : ""}`} 
                        onClick={() => setFilter("completed")}>Completed ({completeTask})</button>
                </div>

                <div id="tasks">
                    {filteredTasks.length > 0 ? (
                        filteredTasks.map((item, index) => (
                            <div id='task-child' key={index} className={`div${item.taskPriority}`}>
                                <p id={item.completed ? "title-task-done" : "title-task"}>{item.taskTitle}</p>
                                <div id="task-info">
                                    <div id='category-task' className={item.taskCategory}>{item.taskCategory}</div>
                                    <div id='priority-task' className={item.taskPriority}>{item.taskPriority}</div>
                                </div>
                                
                                <div id="task-button">
                                    <button
                                        onClick={() => item.completed ? UndoTask(item.id) : CompleteTask(item.id)} 
                                        className={item.completed ? "undo-btn" : "complete-btn"}    
                                    >
                                        {item.completed ? "UNDO" : "COMPLETE"}
                                    </button>
                                    <button className='delete-btn' 
                                        onClick={() => DeleteTask(item.id, item.completed ? 'completed' : 'pending')}>
                                        DELETE
                                    </button>
                                </div>
                            </div>
                        ))
                        ) : (
                            <p id='no-task'>📜❓ There is no task yet</p>
                    )}
                </div>
            </div>
        </main>
    )
}

export default Tasks