
'use client'
import React from 'react';
import toast from 'react-hot-toast';
import { logout } from '../auth';




const LogoutButton = () => {


    const handleLogout = async (e: React.MouseEvent) => {
        e.preventDefault();
        const data = await logout();
        console.log('logout data', data);
        if (!data) {
            alert('Logout failed')
            toast.error('Logout failed')
        }

        else if (data.status === 200) {
            alert('Logged out successfully')
            toast.success('Logged out successfully')
            window.location.href = '/'
        }
        else {
            alert('Logout failed')
            toast.error('Logout failed')
        }

    }

    return (
        <button
            onClick={handleLogout}
            className="btn btn-danger uppercase">
            LogOut
        </button>
    );



}

export default LogoutButton;