'use client'
import { IProduct } from '@/app/api/products/products.model';
import { ButtonWithIcon } from '@/app/components/buttons/buttonsWithIcon';
import { CustomCheckbox } from '@/app/components/form-components/checkbox';
import CustomInput from '@/app/components/form-components/input';
import CustomSelect from '@/app/components/form-components/select';
import { deleteProduct, getProductById, updateProduct } from '@/app/lib/data-access/products';
import { useStoreContext } from '@/app/lib/data-store/store';
import usePhosphorIcons from '@/app/lib/phosphor';

import Image from 'next/image';
import { useParams } from 'next/navigation'
import React, { useEffect } from 'react'
import toast from 'react-hot-toast';
import mongoose from 'mongoose';
import FormContainer from '@/app/components/form-components/form-container';
import { ImageUploadButton } from '@/app/components/buttons/upload-image-button';
import { deleteFromCloudinary } from '@/app/api/imageDeleteFromCloudinary';



export default function ManageProductsPage() {



    const { id } = useParams()
    const { ArrowArcLeft } = usePhosphorIcons()

    const [loading, setLoading] = React.useState(true)
    const [product, setProduct] = React.useState<IProduct>()
    const [productCategories, setProductCategories] = React.useState<string[]>([])
    const [editedDetails, setEditedDetails] = React.useState<IProduct>({
        _id: '' as unknown as mongoose.Schema.Types.ObjectId,
        title: '',
        description: '',
        tagline: '',
        price: 0,
        stock: 0,
        inStock: false,
        active: false,
        isFeatured: false,
        image_urls: [],
        categories: [],
        discountPercentage: 0,
        images: [],
    })
    const [selectedCategories, setSelectedCategories] = React.useState<string[]>([])
    const { categories } = useStoreContext()
    const [enableEdit, setEnableEdit] = React.useState(false)
    const [editedImages, setEditedImages] = React.useState<string[]>([])
    const [addMoreImages, setAddMoreImages] = React.useState(false)


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
                setEditedDetails({
                    _id: data.data._id,
                    title: data.data.title,
                    description: data.data.description,
                    tagline: data.data.tagline,
                    price: data.data.price,
                    stock: data.data.stock,
                    inStock: data.data.inStock,
                    active: data.data.active,
                    isFeatured: data.data.isFeatured,
                    image_urls: data.data.image_urls,
                    categories: data.data.categories,
                    discountPercentage: data.data.discountPercentage,
                    images: data.data.images
                })
                if (data.data.image_urls) setEditedImages(data.data.image_urls);
                console.log('product', data.data, 'images', data.data.image_urls);
                setLoading(false)
            }
        })
    }, [loading, id])
    useEffect(() => {
        if (!categories) return
        if (!product) return
        const productCats = categories.filter((c) => product.categories.includes(c._id!))
        setProductCategories(productCats.map((c) => c.title as string))

    }, [categories, product])
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.currentTarget
        if (name === 'inStock' || name === 'active' || name === 'isFeatured') {
            setEditedDetails((prev) => ({ ...prev, [name]: e.currentTarget.checked }))
            return
        }
        setEditedDetails((prev) => ({ ...prev, [name]: value }))
    }
    const handleSelectChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const { value } = e.target
        setSelectedCategories((prev) => [...prev, value])
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

                const productImages = product?.images.map((img) => img.publicId);
                deleteFromCloudinary(productImages as string[]).then((data) => {
                    if (data.status === 200) {
                        console.log('deleted from cloudinary');
                        toast.success('Deleted from cloudinary')
                    }
                    else {
                        console.log('delete from cloudinary failed');
                        toast.error('Delete from cloudinary failed')
                    }
                })
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




    const handleDeleteImage = (e: React.MouseEvent) => {
        e.preventDefault()
        console.log('delete image');
        const target = e.target as HTMLButtonElement
        const image = target.id.split('-')[1];
        console.log('image', image);
        if (!image) return
        setEditedImages((prev) => prev.filter((img) => img !== image));
        setEditedDetails((prev) => ({ ...prev, image_urls: prev.image_urls.filter((img) => img !== image) }))
    }


    const handleSave = async (e: React.MouseEvent) => {
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
        });

        const deletedImageUrls = product?.image_urls.filter((img) => !editedImages.includes(img));

        const publicIds = deletedImageUrls?.map((url) => {
            return product?.images.find(((img) => {
                return img.url === url || img.secure_url === url
            }))?.publicId;
        });

        console.log('publicIds', publicIds);
        deleteFromCloudinary(publicIds as string[]).then((data) => {
            if (data.status === 200) {
                console.log('deleted from cloudinary');
            }
            else {
                console.log('delete from cloudinary failed');
            }
        }



        )
    }

    const handleAddMoreImages = (e: React.MouseEvent) => {
        e.preventDefault()
        setAddMoreImages((prev) => !prev)
    }




    const { Trash } = usePhosphorIcons()

    if (loading) {
        return <p>Loading...</p>
    }

    return (
        <div>
            <div className='toolbar'>
                <ButtonWithIcon onClick={handleBackClick} icon={<ArrowArcLeft />} label='Back' />
            </div>
            {!enableEdit &&
                <div>
                    <h1>Product Detail</h1>
                    <p>Product ID: {id}</p>
                    <div className='grid grid-cols-3'>
                        {product && product.image_urls &&
                            product.image_urls.map((img) => {
                                if (!img) return
                                return (
                                    <div className='flex gap-12' key={img}>
                                        <Image src={img} alt={''} height={240} width={240} priority className=' p-4 h-auto ' />
                                    </div>
                                )
                            })}
                    </div>
                    <p>Product Name:{product?.title} </p>
                    <p>Product Description: {product?.description}</p>
                    <p>Product Price: {product?.price}</p>
                    <p>Product Stock: {product?.stock}</p>
                    <p>Product In Stock: {product?.inStock === true ? 'true' : 'false'}</p>
                    <p>Product Active: {product?.active === true ? 'true' : 'false'}</p>
                    {/*  */}
                    <p>Product isFeatured: {product?.isFeatured === true ? 'true' : 'false'}</p>
                    {/*  */}
                    <p>Product Categories: {productCategories.join(', ')}</p>

                </div>
            }

            {enableEdit &&
                <div>
                    <h1 className='mb-6'>Edit Product</h1>

                    <div>
                        <h4>Edit Product Images</h4>
                        <div className='grid grid-cols-3'>

                            {editedImages &&
                                editedImages.map((img) => {
                                    if (!img) return
                                    return (
                                        <div className='flex flex-col gap-2' key={img}>
                                            <Image src={img} alt={''} height={240} width={240} priority className=' p-4 h-auto ' />
                                            <ButtonWithIcon onClick={handleDeleteImage} icon={<Trash />} label='Delete' id={`delete-${img}`} />
                                        </div>
                                    )
                                })}

                        </div>
                    </div>

                    <FormContainer title='Edit Product Details' description=''  >
                        <form action="">
                            <CustomInput label='Title' value={editedDetails.title} onChange={handleChange} name='title' type='text' />
                            <CustomInput label='Description' value={editedDetails.description} onChange={handleChange} name='description' type='text' />
                            <CustomInput label='Price' value={editedDetails.price} onChange={handleChange} name='price' type='number' />
                            <CustomInput label='Stock' value={editedDetails.stock} onChange={handleChange} name='stock' type='number' />
                            <CustomCheckbox label='In Stock' value={editedDetails.inStock} onChange={handleChange} name='inStock' />
                            <CustomCheckbox label='Active' value={editedDetails.active} onChange={handleChange} name='active' />
                            <CustomCheckbox label='Is Featured' value={editedDetails.isFeatured} onChange={handleChange} name='isFeatured' />
                            <CustomSelect label='Categories' required={true} multiple={true} onChange={handleSelectChange} name='categories'
                                options={categories!.map((c) => ({ label: c.title as string, value: c._id as unknown as string }))} />
                        </form>
                    </FormContainer>

                    <div>
                        {!addMoreImages && <ButtonWithIcon onClick={handleAddMoreImages} icon={<></>} label={'Add more images?'} />}

                        {addMoreImages &&
                            <FormContainer title='Add Images' description='' >
                                <ImageUploadButton
                                    retrieveImageUrls={(urls) => {
                                        setEditedImages((prev) => [...prev, ...urls]);
                                        setEditedDetails((prev) => ({ ...prev, image_urls: [...prev.image_urls, ...urls] }))
                                    }}
                                />
                            </FormContainer>
                        }
                    </div>
                    <button type='button' onClick={handleSave}>Save</button>

                </div>
            }



            <div className='buttons grid grid-cols-3'>
                <button onClick={(e) => { e.preventDefault(); setEnableEdit((prev) => !prev) }} >{enableEdit ? 'Cancel' : 'Edit'}</button>
                {!enableEdit && <button onClick={(e) => { e.preventDefault(); setEnableDelete((prev) => !prev) }}>{enableDelete ? 'Cancel Delete' : 'Delete'}</button>}
            </div>

            {enableDelete &&
                <div>
                    <h3>Delete Product</h3>
                    <p>Are you sure you want to delete this product?</p>
                    <div className='grid grid-cols-2'>
                        <button onClick={handleDelete}>Yes</button>
                        <button onClick={(e) => { e.preventDefault(); setEnableDelete(false) }}>No</button>
                    </div>


                </div>
            }




        </div>

    )

}
