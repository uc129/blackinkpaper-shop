'use server'
/* eslint-disable*/

import { revalidateTag } from "next/cache";


export async function getAllProducts() {
    const response = await fetch(`/api/products/all`, {
        method: 'GET',
        cache: 'force-cache',
        next: {
            revalidate: 3600,
            tags: ['products']
        }
    });
    const data = await response.json();
    return data;
}

export async function getProductById(id: string) {
    const response = await fetch(`/api/products?id=${id}`, {
        method: 'GET',
        cache: 'force-cache',
        next: {
            revalidate: 3600,
            tags: ['products']
        }
    });
    const data = await response.json();
    return data;
}


export async function createProduct(productData: any) {
    const response = await fetch(`/api/products`, {
        method: 'POST',
        body: JSON.stringify(productData),
    });
    revalidateTag('products');
    const data = await response.json();
    console.log('create product', data);
    return data;
}



export async function updateProduct(id: string, productData: any) {
    const response = await fetch(`/api/products`, {
        method: 'PUT',
        body: JSON.stringify(productData),
    });
    const data = await response.json();
    console.log('update product', data);
    revalidateTag('products');

    return data;
}


export async function deleteProduct(id: string) {
    const response = await fetch(`/api/products?id=${id}`, {
        method: 'DELETE',
    });
    const data = await response.json();
    console.log('delete product', data);
    revalidateTag('products');

    return data;
}