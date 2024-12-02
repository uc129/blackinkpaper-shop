'use client'
import { useState } from "react"
import CustomInput from "../../components/form-components/input"
import FormContainer from "@/app/components/form-components/form-container"
import { signup } from "../auth"



export default function SignupPage() {




    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })

    const [error, setError] = useState({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: ''
    })



    const handleChange = (e: any) => {
        // validate()
        setFormData({ ...formData, [e.target.name]: e.target.value })
    }


    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault()

        if (!formData.firstName || !formData.lastName || !formData.email || !formData.phone || !formData.password) {
            setError({ ...error, firstName: 'Please fill in all fields' })
            return
        }
        else if (formData.password.length < 4) {
            setError({ ...error, password: 'Password must be at least 4 characters' })
            return
        }

        else if (formData.password !== formData.confirmPassword) {
            setError({ ...error, confirmPassword: 'Passwords do not match' })
            return
        }


        const res = await signup(formData.firstName, formData.lastName, formData.email, formData.phone, formData.password, formData.confirmPassword)
        if (res.status === 201) {
            alert('Signup successful')
            window.location.href = '/auth/login'
        }
        console.log(res)
    }





    return (
        <div className="w-full">
            {
                <FormContainer title="Signup"
                    description={`Welcome to blackinkpaper.`}
                    tagline="Please signup to purchase items and receive exclusive news and offers."
                >

                    <CustomInput label="First Name" name="firstName" type="text" error={error.firstName} onChange={handleChange} value={formData.firstName} />
                    <CustomInput label="Last Name" name="lastName" type="text" error={error.lastName} onChange={handleChange} value={formData.lastName} />
                    <CustomInput label="Email" name="email" type="email" error={error.email} onChange={handleChange} value={formData.email} />
                    <CustomInput label="Phone" name="phone" type="tel" error={error.phone} onChange={handleChange} value={formData.phone} />
                    <CustomInput label="Password" name="password" type="password" error={error.password} onChange={handleChange} value={formData.password} />
                    <CustomInput label="Confirm Password" name="confirmPassword" type="password" error={error.confirmPassword} onChange={handleChange} value={formData.confirmPassword} />
                    <button onClick={handleSubmit}>Signup</button>
                </FormContainer>}

        </div>

    )

}