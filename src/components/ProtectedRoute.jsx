import { useContext } from "react"
import { AuthContext } from "../context/AuthContext"
import { Navigate } from "react-router"

const ProtectedRoute = ({ children }) => {
    const { state } = useContext(AuthContext)

    if(!state.isAuthenticated) {
        return <Navigate to="/login" replace />
    }

    return children
}

export default ProtectedRoute