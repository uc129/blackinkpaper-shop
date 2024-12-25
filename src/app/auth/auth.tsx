'use client'
/* eslint-disable */

import { API_URL } from "../lib/constants/api_url";



const login = async (email: string, password: string) => {
    const res = await fetch(`${API_URL}/users/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });
    return await res.json();
};





const logout = async () => {
    const res = await fetch(`${API_URL}/users/logout`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
    });
    // console.log(await res.json());

    const data = await res.json();
    return data;
};





const signup = async (firstName: string, lastName: string, email: string, phone: string, password: string, confirmPassword: string) => {
    const res = await fetch(`${API_URL}/users/signup`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ firstName, lastName, email, phone, password }),
    });
    return await res.json();
}

const verify = async (email: string, token: string) => {
    const res = await fetch(`${API_URL}/users/verify`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token }),
    });
    return await res.json();
}

const forgotPassword = async (email: string) => {
    const res = await fetch('/api/users/forgot-password', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
    });
    return await res.json();
}


const resetPassword = async (email: string, token: string, password: string) => {
    const res = await fetch(`${API_URL}/users/reset-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, token, password }),
    });
    return await res.json();
}


const updatePassword = async (email: string, password: string, newPassword: string) => {
    const res = await fetch(`${API_URL}/users/update-password`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, newPassword }),
    });
    return await res.json();
}


const checkAuth = async () => {
    const res = await fetch(`${API_URL}/users/auth-check`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
        },
        cache: 'reload',
        next: {
            revalidate: 1,
            tags: ['auth']
        }
    });
    return await res.json();
}



export { login, logout, signup, verify, forgotPassword, resetPassword, updatePassword, checkAuth };

