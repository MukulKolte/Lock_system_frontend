import { createContext, useContext, useState } from "react";
import {
    login as loginService,
    logout as logoutService,
    getCurrentUser
} from "../services/authService";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

    const [user, setUser] = useState(getCurrentUser());

    const login = async (username, password) => {
        const data = await loginService(username, password);

        setUser(data.user);

        return data;
    };

    const logout = () => {
        logoutService();
        setUser(null);
    };

    return (
        <AuthContext.Provider
            value={{
                user,
                login,
                logout,
                isAuthenticated: !!user
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => {
    return useContext(AuthContext);
};