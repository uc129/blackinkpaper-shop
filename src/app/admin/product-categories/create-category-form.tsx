'use client'
import CustomInput from "@/app/components/form-components/input"
import { createProductCategory } from "@/app/lib/data-access/product-categories"
import { useState } from "react"

import { useRouter } from "next/navigation"
import FormContainer from "@/app/components/form-components/form-container"




const CreateCategoryForm = () => {

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tagline: '',
    })


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const router = useRouter()

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        console.log('formData', formData);
        if (!formData.title || !formData.description || !formData.tagline) {
            alert('Please provide all required fields');
            return;
        }
        const category = await createProductCategory(formData.title, formData.description, formData.tagline);
        // console.log('category', category);
        if (category) {
            setFormData({
                title: '',
                description: '',
                tagline: '',
            })
            alert('Category created successfully');
            router.push('/admin/product-categories')

        }

    }


    return (
        <FormContainer title="Create a new Category" description="" >
            <form>
                <CustomInput type="text" name="title" label="Title" placeholder="Title" value={formData.title} onChange={handleChange} />
                <CustomInput type="text" name="description" label="Description" placeholder="Description" value={formData.description} onChange={handleChange} />
                <CustomInput type="text" name="tagline" label="Tagline" placeholder="Tagline" value={formData.tagline} onChange={handleChange} />
                <button onClick={handleSubmit}>Create Category</button>
            </form>
        </FormContainer>
    )





}


export default CreateCategoryForm