import { initialAuthState } from "../context/AuthContext"

export const AuthReducer = (state, action) => {
    switch(action.type) {
        case "LOGIN":
            return {
                ...state,
                user: action.payload,
                isAuthenticated: true,
            }

        case "LOGOUT":
            return initialAuthState;

        default:
            return state;
    }
}