import { Routes, Route, Navigate } from 'react-router'
import './App.css'
import { AuthProvider } from './context/AuthProvider'
import Login from './pages/Login'
import ProtectedRoute from './components/ProtectedRoute'
import Dashboard from './pages/Dashboard'
import Tasks from './pages/Tasks'
import Profile from './pages/Profile'
import { TaskProvider } from './context/TaskProvider'

function App() {
  return (
    <>
      <AuthProvider>
        <TaskProvider>
          <Routes>
            <Route path="/" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />

            <Route path="/dashboard" element={
              <ProtectedRoute>
                <Dashboard />
              </ProtectedRoute>
            } />

            <Route path="/tasks" element={
              <ProtectedRoute>
                <Tasks />
              </ProtectedRoute>
            } />

            <Route path="/profile" element={
              <ProtectedRoute>
                <Profile />
              </ProtectedRoute>
            } />

          </Routes>
        </TaskProvider>
      </AuthProvider>
    </>
  )
}

export default App
