'use client'
import { IProductCategory } from '@/app/api/product-categories/categories.model';
import { IProduct } from '@/app/api/products/products.model';
import { ButtonWithIcon } from '@/app/components/buttons/buttonsWithIcon';
import { CustomCheckbox } from '@/app/components/form-components/checkbox';
import CustomInput from '@/app/components/form-components/input';
import CustomSelect from '@/app/components/form-components/select';
import { getAllProductCategories } from '@/app/lib/data-access/product-categories';
import { deleteProduct, getProductById, updateProduct } from '@/app/lib/data-access/products';
import usePhosphorIcons from '@/app/lib/phosphor';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';



export default function ManageProductsPage() {



    const { id } = useParams()
    console.log('id', id);
    const [product, setProduct] = React.useState<IProduct>()
    const [categories, setCategories] = React.useState<IProductCategory[]>()
    const [productCategories, setProductCategories] = React.useState<string[]>()
    const [loading, setLoading] = React.useState(true)
    const [enableEdit, setEnableEdit] = React.useState(false)


    const [editedDetails, setEditedDetails] = React.useState<any>({
        title: '',
        description: '',
        price: '',
        stock: '',
        inStock: false,
        active: false,
        categories: [],

    })

    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])

    useEffect(() => {
        // fetch product by id
        if (!id) return
        if (!loading) return
        getProductById(id as string).then((data) => {
            if (data.status === 404) {
                alert('Product not found')
                window.history.back()
                return
            }
            else if (data.status === 200) {
                setProduct(data.data)
                console.log('product', data.data);
                setLoading(false)
                setEditedDetails({
                    title: data.data.title,
                    description: data.data.description,
                    price: data.data.price,
                    stock: data.data.stock,
                    inStock: data.data.inStock,
                    active: data.data.active,
                    categories: data.data.categories
                })
            }
        })
    }, [loading, id])

    useEffect(() => {
        // fetch all product categories
        if (categories) return
        getAllProductCategories().then((data) => {
            if (data.status === 200) {
                setCategories(data.data)
                setLoading(false)
            }
        })
    }, [loading])

    useEffect(() => {
        if (!categories) return
        if (!product) return
        let filteredCat = categories.filter((category: IProductCategory) => product.categories.includes(category._id))
        setProductCategories(filteredCat.map((c) => c.title))
    }, [categories, product])


    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target
        if (name === 'inStock' || name === 'active') {
            setEditedDetails((prev: any) => ({ ...prev, [name]: e.target.checked }))
            return
        }
        setEditedDetails((prev: any) => ({ ...prev, [name]: value }))
    }

    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { name, value } = e.target
        setSelectedCategories((prev) => [...prev, value])
    }

    const handleSave = (e: React.MouseEvent) => {
        e.preventDefault()

        const productData = {
            id: id,
            ...editedDetails,
            categories: selectedCategories
        }
        console.log('productData', productData);
        if (!id) return
        // save product
        updateProduct(id as string, productData).then((data) => {
            if (data.status === 200) {
                alert('Product updated successfully')
                toast.success('Product updated successfully')
                setEnableEdit(false)
                window.location.reload()
            }
            else {
                alert('Product update failed')
                toast.error('Product update failed')
            }
        })

    }

    const [enableDelete, setEnableDelete] = React.useState(false)


    const handleDelete = (e: React.MouseEvent) => {
        e.preventDefault()
        if (!enableDelete) return
        if (!id) return
        // delete product
        deleteProduct(id as string).then((data) => {
            if (data.status === 200) {
                alert('Product deleted successfully')
                toast.success('Product deleted successfully')
                window.location.href = '/admin/products'
            }
            else {
                alert('Product delete failed')
                toast.error('Product delete failed')
            }
        })
    }


    const handleBackClick = (e: React.MouseEvent) => {
        e.preventDefault()
        window.history.back()

    }



    if (loading) {
        return <p>Loading...</p>
    }

    const { ArrowArcLeft } = usePhosphorIcons()


    return (
        <div>
            <div className='toolbar'>

                <ButtonWithIcon onClick={handleBackClick} icon={<ArrowArcLeft />} label='Back' />
            </div>
            {!enableEdit &&
                <div>
                    <h1>Product Detail</h1>
                    <p>Product Name:{product?.title} </p>
                    <p>Product Description: {product?.description}</p>
                    <p>Product Price: {product?.price}</p>
                    <p>Product Stock: {product?.stock}</p>
                    <p>Product In Stock: {product?.inStock === true ? 'true' : 'false'}</p>
                    <p>Product Active: {product?.active === true ? 'true' : 'false'}</p>
                    <p>Product Categories: {productCategories?.map((c) => <span key={String(c)}>{String(c)}</span>)}</p>
                    <p>Product ID: {id}</p>
                </div>
            }

            {enableEdit &&
                <div>
                    <h1>Edit Product</h1>
                    <form action="">
                        <CustomInput label='Title' value={editedDetails.title} onChange={handleChange} name='title' type='text' />
                        <CustomInput label='Description' value={editedDetails.description} onChange={handleChange} name='description' type='text' />
                        <CustomInput label='Price' value={editedDetails.price} onChange={handleChange} name='price' type='number' />
                        <CustomInput label='Stock' value={editedDetails.stock} onChange={handleChange} name='stock' type='number' />
                        <CustomCheckbox label='In Stock' value={editedDetails.inStock} onChange={handleChange} name='inStock' />
                        <CustomCheckbox label='Active' value={editedDetails.active} onChange={handleChange} name='active' />
                        <CustomSelect label='Categories' required={true} multiple={true} onChange={handleSelectChange} name='categories'
                            options={categories!.map((c) => ({ label: c.title, value: c._id as unknown as string }))} />
                        <button type='button' onClick={handleSave}>Save</button>
                    </form>

                </div>
            }



            <div className='buttons grid grid-cols-3'>
                <button onClick={(e) => { e.preventDefault(); setEnableEdit((prev) => !prev) }} >{enableEdit ? 'Cancel' : 'Edit'}</button>
                <button onClick={(e) => { e.preventDefault(); setEnableDelete((prev) => !prev) }}>{enableDelete ? 'Cancel Delete' : 'Delete'}</button>
            </div>

            {enableDelete &&
                <div>
                    <h1>Delete Product</h1>
                    <p>Are you sure you want to delete this product?</p>
                    <button onClick={handleDelete}>Yes</button>
                    <button onClick={(e) => { e.preventDefault(); setEnableDelete((prev) => prev = false) }} >No</button>

                </div>
            }
        </div>
    )
}