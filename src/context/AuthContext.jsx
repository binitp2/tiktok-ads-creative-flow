import { createContext, useState } from "react";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
    const [accessToken, setAccessToken] = useState(
        localStorage.getItem("tiktok_access_token")
    );
    const [authError, setAuthError] = useState(null);

    const login = (token) => {
        localStorage.setItem("tiktok_access_token", token);
        setAccessToken(token);
        setAuthError(null);
    };

    const logout = () => {
        localStorage.removeItem("tiktok_access_token");
        setAccessToken(null);
    };

    return (
        <AuthContext.Provider
            value={{
                accessToken,
                login,
                logout,
                authError,
                setAuthError,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
