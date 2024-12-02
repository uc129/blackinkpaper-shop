'use server'

let ApiUrl = process.env.API_URL || "http://localhost:3000/api"

const getAllProductCategories = async () => {
    try {
        const response = await fetch(`${ApiUrl}/product-categories/all`, {
            method: 'GET',
            cache: 'force-cache',
            next: {
                revalidate: 60,
                tags: ['productcategories']
            }
        });

        const data = await response.json();
        console.log('categories list', data);
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}

const getProductCategoryById = async (id: string) => {

    try {
        const response = await fetch(`${ApiUrl}/product-categories`, {
            method: 'GET',
            body: JSON.stringify({ id }),
            cache: 'force-cache',
            next: {
                revalidate: 60,
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
        const response = await fetch(`${process.env.API_URL}/product-categories`, {
            method: 'POST',
            body: JSON.stringify({ title, description, tagline }),
        });
        const data = await response.json();
        if (data.status !== 201) {
            console.error(data.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


const updateProductCategory = async (id: string, title: string, description: string, tagline: string) => {
    try {
        const response = await fetch('/product-categories', {
            method: 'PUT',
            body: JSON.stringify({ id, title, description, tagline }),
        });
        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


const deleteProductCategory = async (id: string) => {
    try {
        const response = await fetch('/product-categories', {
            method: 'DELETE',
            body: JSON.stringify({ id }),
        });
        const data = await response.json();
        if (data.status !== 200) {
            console.error(data.message);
            return null;
        }
        return data;
    }
    catch (error) {
        console.error(error);
    }
}


export { getAllProductCategories, getProductCategoryById, createProductCategory, updateProductCategory, deleteProductCategory };