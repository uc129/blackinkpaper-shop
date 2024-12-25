'use client'

import { IProductCategory } from "@/app/api/product-categories/categories.model";
import FormContainer from "@/app/components/form-components/form-container";
import CustomInput from "@/app/components/form-components/input";
import { getProductCategoryById, updateProductCategory } from "@/app/lib/data-access/product-categories";
import { useParams, useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import toast from "react-hot-toast";



export default function ManageProductCategoriesPage() {

    const { id } = useParams();

    const [loading, setLoading] = useState<boolean>(true);
    const [category, setCategory] = useState<IProductCategory | null>(null);
    const [enableEdit, setEnableEdit] = useState<boolean>(false);
    const [editedDetails, setEditedDetails] = useState<IProductCategory>({
        title: '',
        description: '',
        tagline: ''
    });
    const [enableDelete, setEnableDelete] = useState<boolean>(false);
    const router = useRouter();


    useEffect(() => {
        if (!id) return;
        if (!loading) return
        console.log('fetching category with id:', id);

        const fetchCategory = async () => {
            const response = await getProductCategoryById(id as string);
            if (!response) {
                console.error('Category not found');
                return;
            }
            console.log('Category found:', response.data);
            setCategory(response.data);
            setEditedDetails(response.data);
            setLoading(false);
        }

        fetchCategory();

    }, [id, loading])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedDetails({ ...editedDetails, [name]: value })
    }


    const handleSave = async () => {
        console.log('Saving changes:', editedDetails);
        if (!editedDetails) return;
        if (editedDetails.title === '' || editedDetails.description === '' || editedDetails.tagline === '') {
            alert('All fields are required');
            return;
        }
        // save changes
        if (editedDetails.title === category?.title && editedDetails.description === category?.description && editedDetails.tagline === category?.tagline) {
            alert('No changes made');
            return;
        }
        // save changes

        const response = updateProductCategory(id as string, editedDetails.title!, editedDetails.description!, editedDetails.tagline!);
        if (!response) {
            alert('Failed to update category');
            return;
        }
        alert('Category updated successfully');
        toast.success('Category updated successfully');
        router.push('/admin/product-categories');
    }

    return (
        <div>
            <h1 className="mb-12">Manage Product Categories</h1>

            <FormContainer title="Edit category" description="" >
                <CustomInput type="text" label="Title" value={editedDetails?.title as string}
                    disabled={!enableEdit} onChange={handleChange} name="title" />

                <CustomInput type="text" label="Description" value={editedDetails?.description as string}
                    disabled={!enableEdit} onChange={handleChange} name="description" />

                <CustomInput type="text" label="Tagline" value={editedDetails?.tagline as string}
                    disabled={!enableEdit} onChange={handleChange} name="tagline" />

                <div className="flex justify-between">
                    <button onClick={(e) => { e.preventDefault(); setEnableEdit(!enableEdit) }}
                        className="bg-blue-500 text-white px-4 py-2 rounded-md"
                    >
                        {enableEdit ? 'Cancel' : 'Edit'}
                    </button>

                    <button onClick={(e) => { e.preventDefault(); setEnableDelete(!enableDelete) }}
                        className="bg-red-500 text-white px-4 py-2 rounded-md"
                    >
                        {enableDelete ? 'Cancel Delete' : 'Delete'}
                    </button>
                </div>

                {
                    enableEdit &&
                    <button className="bg-green-500 text-white px-4 py-2 rounded-md mt-4"
                        disabled={!enableEdit}
                        onClick={handleSave}
                    >
                        Save
                    </button>
                }
            </FormContainer>

        </div>
    )
}

