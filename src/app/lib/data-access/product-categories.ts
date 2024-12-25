'use server'
import { revalidateTag } from "next/cache";
import { API_URL } from "../constants/api_url";


const getAllProductCategories = async () => {
    try {
        const response = await fetch(`${API_URL}/product-categories/all`, {
            method: 'GET',
            cache: 'force-cache',

            next: {
                revalidate: 3600,
                tags: ['productcategories']
            }
        });

        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        console.log('product categories', data);
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

const getProductCategoryById = async (id: string) => {

    try {
        const response = await fetch(`${API_URL}/product-categories?id=${id}`, {
            method: 'GET',
            cache: 'force-cache',
            next: {
                revalidate: 3600,
                tags: ['productcategories']
            }
        });
        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        return await data;
    }
    catch (error) {
        console.error(error);
    }

}


const createProductCategory = async (title: string, description: string, tagline: string) => {
    try {
        const response = await fetch(`${API_URL}/product-categories`, {
            method: 'POST',
            body: JSON.stringify({ title, description, tagline }),
        });
        const data = await response.json();

        if (data.status !== 201) {
            console.error(data.message);
            return null;
        }
        revalidateTag('productcategories');
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


const updateProductCategory = async (id: string, title: string, description: string, tagline: string) => {
    try {
        const response = await fetch(`${API_URL}/product-categories`, {
            method: 'PUT',
            body: JSON.stringify({ id, title, description, tagline }),
        });
        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        revalidateTag('productcategories');
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


const deleteProductCategory = async (id: string) => {
    try {
        const response = await fetch(`${API_URL}/product-categories`, {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        revalidateTag('productcategories');
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


export { getAllProductCategories, getProductCategoryById, createProductCategory, updateProductCategory, deleteProductCategory };