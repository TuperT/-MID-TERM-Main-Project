import { createContext } from "react";

export const initialAuthState = {
    user: null,
    isAuthenticated: false,
}

export const AuthContext = createContext()