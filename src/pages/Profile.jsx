import { useContext } from 'react'
import { useNavigate } from 'react-router'
import Navbar from '../components/Navbar'
import { AuthContext } from '../context/AuthContext'
import { TaskContext } from '../context/TaskContext'
import '../styles/Profile.css'

const Profile = () => {
    const navigate = useNavigate()
    const { state: authState, logout } = useContext(AuthContext)
    const { state: taskState } = useContext(TaskContext)

    const userEmail = authState?.user || 'student@gmail.com'
    const userName = userEmail.split('@')[0] || 'student'
    const totalTask = taskState?.totalTask || 0
    const completeTask = taskState?.completeTask || 0
    const pendingTask = taskState?.pendingTask || 0
    const tasks = taskState?.tasks || []

    const completionRate = totalTask > 0 ? Math.round((completeTask / totalTask) * 100) : 0

    const highCount   = tasks.filter(t => t.taskPriority === 'HIGH').length
    const mediumCount = tasks.filter(t => t.taskPriority === 'MEDIUM').length
    const lowCount    = tasks.filter(t => t.taskPriority === 'LOW').length
    const maxCount    = Math.max(highCount, mediumCount, lowCount, 1)

    function handleSignOut() {
        logout()
        navigate('/login')
    }

    return (
        <main className="profile-main">
            <Navbar />

            <div className="profile-container">

                <div className="profile-heading">
                    <p className="profile-mini-title">PROFILE</p>
                    <p className="profile-main-title">Account</p>
                </div>

                <div className="profile-card">

                    <div className="profile-user-row">
                        <div className="profile-avatar">
                            <span className="profile-avatar-letter">
                                {userName[0].toUpperCase()}
                            </span>
                        </div>
                        <div className="profile-user-info">
                            <p className="profile-user-name">{userName}</p>
                            <p className="profile-user-email">{userEmail}</p>
                            <div className="profile-status-badge">
                                <span className="profile-status-dot" />
                                <span className="profile-status-text">Logged In</span>
                            </div>
                        </div>
                    </div>

                    <div className="profile-divider" />

                    <div className="profile-stats-grid">
                        <div className="profile-stat-box">
                            <p className="profile-stat-label">TOTAL TASKS</p>
                            <p className="profile-stat-value purple">{totalTask}</p>
                        </div>
                        <div className="profile-stat-box">
                            <p className="profile-stat-label">COMPLETED</p>
                            <p className="profile-stat-value green">{completeTask}</p>
                        </div>
                        <div className="profile-stat-box">
                            <p className="profile-stat-label">PENDING</p>
                            <p className="profile-stat-value red">{pendingTask}</p>
                        </div>
                        <div className="profile-stat-box">
                            <p className="profile-stat-label">COMPLETION</p>
                            <p className="profile-stat-value purple">{completionRate}%</p>
                        </div>
                    </div>
                </div>

                <div className="profile-card">
                    <p className="profile-chart-title">Tasks by Priority</p>

                    <div className="profile-chart-rows">
                        <div className="profile-chart-row">
                            <span className="profile-chart-label high">High</span>
                            <div className="profile-chart-track high">
                                <div 
                                    className="profile-chart-bar high"
                                    style={{ width: `${(highCount / maxCount) * 100}%` }}
                                />
                            </div>
                            <span className="profile-chart-count high">{highCount}</span>
                        </div>

                        <div className="profile-chart-row">
                            <span className="profile-chart-label medium">Medium</span>
                            <div className="profile-chart-track medium">
                                <div 
                                    className="profile-chart-bar medium"
                                    style={{ width: `${(mediumCount / maxCount) * 100}%` }}
                                />
                            </div>
                            <span className="profile-chart-count medium">{mediumCount}</span>
                        </div>

                        <div className="profile-chart-row">
                            <span className="profile-chart-label low">Low</span>
                            <div className="profile-chart-track low">
                                <div 
                                    className="profile-chart-bar low"
                                    style={{ width: `${(lowCount / maxCount) * 100}%` }}
                                />
                            </div>
                            <span className="profile-chart-count low">{lowCount}</span>
                        </div>
                    </div>
                </div>

                <button 
                    className="profile-signout-btn" 
                    onClick={handleSignOut}
                >
                    Sign Out
                </button>

            </div>
        </main>
    )
}

export default Profile