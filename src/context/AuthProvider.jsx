import { AuthContext, initialAuthState } from "./AuthContext";
import { AuthReducer } from "../reducers/authReducer";
import { useReducer } from "react";
import { useNavigate } from "react-router";

export const AuthProvider = ({ children }) => {
    const [state, dispatch] = useReducer(AuthReducer, initialAuthState);
    const Navigate = useNavigate()

    const login = (user) => {
        dispatch({
            type: "LOGIN",
            payload: user,
        })
        Navigate("/dashboard")
    }

    const logout = () => {
        dispatch({
            type: "LOGOUT",
        })
        Navigate("/login")
    }

    const value = {
        state,
        dispatch,
        login,
        logout,
    }

    return (
        <AuthContext.Provider value={value} >
            {children}
        </AuthContext.Provider  >
    )
}