import React, { createContext, useContext, useState, ReactNode } from 'react';
import { UserProfile } from '../types';

interface UserContextType {
    user: UserProfile | null;
    setUser: (user: UserProfile) => void;
    clearUser: () => void;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
    const [user, setUserState] = useState<UserProfile | null>(null);

    const setUser = (user: UserProfile) => {
        setUserState(user);
    };

    const clearUser = () => {
        setUserState(null);
    };

    return (
        <UserContext.Provider value={{ user, setUser, clearUser }}>
            {children}
        </UserContext.Provider>
    );
};

export const useUser = () => {
    const context = useContext(UserContext);
    if (!context) {
        throw new Error('useUser must be used within a UserProvider');
    }
    return context;
};
