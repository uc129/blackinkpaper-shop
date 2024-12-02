'use client'


import { createContext, useContext, useEffect, useState } from 'react';
import { checkAuth } from './auth';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { set } from 'mongoose';




export interface UserInfo {
    id?: string,
    email?: string,
    isAdmin?: boolean
    isVerified?: boolean
    firstName?: string
    lastName?: string
    phone?: string
    addresses?: string[]
    avatar?: string
    lastLogin?: string
    isDeleted?: boolean
    createdAt?: string
    updatedAt?: string
    deletedAt?: string

}

interface AuthContextType {
    user: UserInfo | null;
    isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType>({
    user: null,
    isAuthenticated: false,

});


export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
    const [user, setUser] = useState<UserInfo | null>(null);
    const [isAuthenticated, setIsAuthenticated] = useState(false);

    const checkAuthStatus = async () => {
        try {
            const res = await checkAuth();
            if (res.status === 200) {
                setUser(res.user);
                setIsAuthenticated(true);
            }
            else if (res.status === 401) {
                setUser(null);
                setIsAuthenticated(false);
            }
            console.log('auth check response', res);
        }
        catch (err) {
            console.log(err);
        }


    }

    useEffect(() => {
        checkAuthStatus();
    }, [])


    return (
        <AuthContext.Provider value={{ user, isAuthenticated }}>
            {children}
        </AuthContext.Provider>
    )
}






