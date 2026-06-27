import React, { createContext, useContext, useState, useEffect } from "react";

const UserContext = createContext(null);

export function UserProvider({ children }) {
    const USER_KEY = import.meta.env.VITE_USER_STORAGE_KEY;
    const [user, setUser] = useState(null);

    useEffect(() => {
        const data = window.sessionStorage.getItem(USER_KEY);
        setUser(data ? JSON.parse(data) : null);
    }, []);

    useEffect(() => {
        if (user !== null) {
            window.sessionStorage.setItem(USER_KEY, JSON.stringify(user));
        }
    }, [user]);

    return (
        <UserContext.Provider value={{ user, setUser }}>
            {children}
        </UserContext.Provider>
    );
}

export function useUser() {
    const context = useContext(UserContext);
    if(!context){
        throw new Error("useUser must be used within a UserProvider");
    }
    return context;
}
