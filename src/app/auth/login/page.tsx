'use client'

import FormContainer from "@/app/components/form-components/form-container";
import CustomInput from "@/app/components/form-components/input";
import { useContext, useEffect, useState } from "react";
import toast from "react-hot-toast";
import { login } from "../auth";

export default function LoginPage() {

    const [loginData, setLoginData] = useState({
        email: '',
        password: ''
    })



    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setLoginData({
            ...loginData,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e: React.FormEvent) => {

        e.preventDefault();

        if (loginData.email === '' || loginData.password === '') {
            alert('Please fill in all fields')
            return
        }

        const response = await login(loginData.email, loginData.password);
        if (response.status === 200) {
            alert('Login successful')
            toast.success('Login successful')
            window.location.href = '/'
        }

        else {
            alert('Login failed')
            toast.error('Login failed')
        }

    }




    return (
        <div>
            {
                <FormContainer
                    title="Login"
                    description="Don't have an account? Sign up here"
                    tagline="Welcome back! Please login to your account"
                >

                    <CustomInput label="Email" type="email" placeholder="Enter your email" value={loginData.email} onChange={handleChange} error="" name="email" />
                    <CustomInput label="Password" type="password" placeholder="Enter your password" value={loginData.password} onChange={handleChange} error="" name='password' />

                    <button className="btn btn-primary" onClick={handleSubmit}>Login</button>

                </FormContainer>}
        </div>
    )
}

