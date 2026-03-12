import { useContext } from 'react'
import Navbar from '../components/Navbar'
import '../styles/Dashboard.css'
import { AuthContext } from '../context/AuthContext'
import { TaskContext } from '../context/TaskContext'

const Dashboard = () => {
    const { state: authState } = useContext(AuthContext)
    const { state: taskState, CompleteTask, DeleteTask, UndoTask } = useContext(TaskContext)
    
    const userEmail = authState?.user || 'student'
    const totalTask = taskState?.totalTask || 0
    const completeTask = taskState?.completeTask || 0
    const pendingTask = taskState?.pendingTask || 0
    const tasks = taskState?.tasks || 0
    const viewtask = tasks.slice(0, 4)
    
    const completionPercentage = totalTask > 0 
        ? Math.min(Math.round((completeTask / totalTask) * 100), 100) 
        : 0

    return (
        <main>
            <Navbar />
            <div id="dashboard-container">
                <div id="title">
                    <p id="mini-title">DASHBOARD</p>
                    <p id="main-title">Hey, <span>student</span></p>
                    <p id="email-subtitle">{userEmail}</p>
                </div>

                <div id="tasks-stat">
                    <div id="stat-total" className='stat-items'>
                        <p id="total-stat">{totalTask}</p>
                        <p className="stat-labels">Total Tasks</p>
                    </div>

                    <div id="stat-completed" className='stat-items'>
                        <p id="complete-stat">{completeTask}</p>
                        <p className="stat-labels">Completed</p>
                    </div>

                    <div id="stat-pending" className='stat-items'>
                        <p id="pending-stat">{pendingTask}</p>
                        <p className="stat-labels">Pending</p>
                    </div>
                </div>

                <div id="task-progress">
                    <div id="progress-title">
                        <p id="progress-subtitle">Completion Rate</p>
                        <span id="progress-progress-percentage">{completionPercentage}%</span>
                    </div>
                    <div 
                        id="progress" 
                        style={{ '--progress-width': `${completionPercentage}%` }}
                    ></div>
                </div>

                <div id="task-container">
                    {viewtask.length > 0 ? (
                        viewtask.map((item, index) => (
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

export default Dashboard