'use client'
import { IProductCategory } from "@/app/api/product-categories/categories.model"
import { CustomCheckbox } from "@/app/components/form-components/checkbox"
import CustomInput from "@/app/components/form-components/input"
import { useMultiStepForm } from "@/app/components/form-components/multistepformHook"
import CustomSelect, { CustomSelectOptionsProps } from "@/app/components/form-components/select"
import { createProduct } from "@/app/lib/data-access/products"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useStoreContext } from "@/app/lib/data-store/store"
import { ToolTipContainer } from "@/app/components/tooltip/tooltip-container"
import FormContainer from "@/app/components/form-components/form-container"
import { ButtonWithIcon } from "@/app/components/buttons/buttonsWithIcon"
import usePhosphorIcons from "@/app/lib/phosphor"
import { ImageData, ImageUploadButton } from "@/app/components/buttons/upload-image-button"
import Image from "next/image"
import { CustomTextArea } from "@/app/components/form-components/text-area"
import { IProduct } from "@/app/api/products/products.model"


type Step1FormData = Partial<IProduct>
// interface Step1FormData <Partial {
//     title: string
//     description: string
//     tagline: string
//     price: number
//     discountPercentage: number
//     stock: number
//     inStock: boolean
//     active: boolean
//     isFeatured: boolean
//     toolsUsed?: string[]
//     features?: string[]
//     colourPallette?: string[]

// }



// Form Steps

const step1 = ({ retrieveData, retrieveErrors, nextClick }:
    {
        retrieveData: (formData: Step1FormData) => void,
        retrieveErrors: (error: boolean) => void; nextClick: boolean
    }) => {

    const [formData, setFormData] = useState<Step1FormData>({
        title: '',
        description: '',
        tagline: '',
        price: 0,
        discountPercentage: 0,
        stock: 100,
        inStock: true,
        active: true,
        isFeatured: false,
        used_tools: [],
        features: [],
        colour_pallette: [],
        featuringCompanies: [],

        // image_urls: [],
    })
    const [errors, setErrors] = useState({
        title: '',
        description: '',
        tagline: '',
        price: '',
        discountPercentage: '',
        stock: '',
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === 'inStock' || e.target.name === 'active' || e.target.name === 'isFeatured') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked || false,
            })
            return
        }

        else if (e.target.name === 'colour_pallette' || e.target.name === 'features' || e.target.name === 'used_tools' || e.target.name === 'featuringCompanies') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.value.split(','),
            })
            return
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const handleTextAreaChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    const { products } = useStoreContext();
    const length = products ? products.length : 0;

    const validateProductData = (formData: Step1FormData) => {
        let errors = false;
        if (!formData.title) {
            setErrors((prev) => ({ ...prev, title: 'Title is required' }))
            errors = true
        }
        else if (formData.title.length < 3) {
            setErrors((prev) => ({ ...prev, title: 'Title must be at least 3 characters' }))
            errors = true
        }
        else setErrors((prev) => ({ ...prev, title: '' }))
        if (!formData.description) {
            setErrors((prev) => ({ ...prev, description: 'Description is required' }))
            errors = true
        }
        else if (formData.description.length < 5) {
            setErrors((prev) => ({ ...prev, description: 'Description must be at least 5 characters' }))
            errors = true
        }
        else setErrors((prev) => ({ ...prev, description: '' }))

        if (!formData.tagline) {
            setErrors((prev) => ({ ...prev, tagline: 'Tagline is required' }))
            errors = true
        }
        else if (formData.tagline.length < 5) {
            setErrors((prev) => ({ ...prev, tagline: 'Tagline must be at least 5 characters' }))
            errors = true
        }
        else setErrors((prev) => ({ ...prev, tagline: '' }))

        if (!formData.price) {
            setErrors((prev) => ({ ...prev, price: 'Price is required' }))
            errors = true
        }
        else if (formData.price < 0) {
            setErrors((prev) => ({ ...prev, price: 'Price must be a positive number' }))
            errors = true
        }
        else setErrors((prev) => ({ ...prev, price: '' }))

        return errors

    }

    useEffect(() => {
        if (formData.title && formData.description) {
            retrieveData(formData)
        }
    }, [formData])

    useEffect(() => {
        if (!nextClick) return
        let error = validateProductData(formData)
        retrieveErrors(error)
    }, [nextClick])

    return (
        <FormContainer title="Add Product Details "
            description={'Add a new product to the inventory.'}
            tagline={length > 0 ? `Total number of products in inventory: ${length}` : ''}>
            <form className="">
                <CustomInput type="text" name="title" label="Title" placeholder="Title" value={formData.title!} onChange={handleChange} error={errors.title} />
                {/* <CustomInput type="text" name="description" label="Description" placeholder="Description" value={formData.description} onChange={handleChange} error={errors.description} /> */}
                <CustomTextArea name="description" label="Description" placeholder="Description" value={formData.description!} onChange={handleTextAreaChange} error={errors.description} />
                <CustomInput type="text" name="tagline" label="Tagline" placeholder="Tagline" value={formData.tagline!} onChange={handleChange} error={errors.tagline} />
                <CustomInput type="number" name="price" label="Price" placeholder="Price" value={formData.price!} onChange={handleChange} error={errors.price} />
                <CustomInput type="number" name="discountPercentage" label="Discount Percentage" placeholder="Discount Percentage" value={formData.discountPercentage!} onChange={handleChange} />
                <CustomInput type="number" name="stock" label="Stock" placeholder="Stock" value={formData.stock!} onChange={handleChange} />

                <CustomInput type="text" name="colour_pallette" label="Colour Pallette" placeholder="Colour Pallette"
                    value={formData.colour_pallette ? formData.colour_pallette.join(',') : ''}
                    onChange={handleChange} />

                <CustomInput type="text" name="features" label="Features" placeholder="Features"
                    value={formData.features ? formData.features.join(',') : ''} onChange={handleChange} />

                <CustomInput type="text" name="used_tools" label="Tools Used" placeholder="Tools Used"
                    value={formData.used_tools ? formData.used_tools.join(',') : ''} onChange={handleChange
                    } />
                <CustomInput type="text" name="featuringCompanies" label="Featuring Companies" placeholder="Featuring Companies"
                    value={formData.featuringCompanies ? formData.featuringCompanies.join(',') : ''} onChange={handleChange
                    } />

                <CustomCheckbox name="inStock" label="In Stock" value={formData.inStock!} onChange={handleChange} />
                <CustomCheckbox name="active" label="Active" value={formData.active!} onChange={handleChange} />
                <CustomCheckbox name="isFeatured" label="Featured" value={formData.isFeatured!} onChange={handleChange} />
            </form>
        </FormContainer>
    )

}

const step2 = ({ retrieveCategoriesList, categories }: { retrieveCategoriesList: (list: CustomSelectOptionsProps[]) => void, categories: IProductCategory[] }) => {



    const [categoriesList, setCategoriesList] = useState<CustomSelectOptionsProps[]>([])

    const [selectedCategory, setSelectedCategory] = useState<CustomSelectOptionsProps>({
        value: '',
        label: '',
    })

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedCategory({
            value: e.target.value,
            label: e.target.selectedOptions[0].label,
        })
    }

    const handleAddCategory = (e: React.MouseEvent) => {
        e.preventDefault()

        if (selectedCategory) {
            if (categoriesList.find((c) => c.value === selectedCategory.value)) {
                return
            }
            if (selectedCategory.value === '') {
                return
            }
            setCategoriesList([...categoriesList, selectedCategory])
        }
    }

    const handleRemoveCategory = (category: string) => {
        setCategoriesList(categoriesList.filter((c) => c.value !== category))
    }

    useEffect(() => {
        categoriesList.length > 0 &&
            retrieveCategoriesList(categoriesList)
    })

    return (
        <FormContainer title="Add Product Categories" description={'Add categories to the product'} >
            <div className="w-full">
                {categories &&
                    <CustomSelect
                        label="Category"
                        name="category"
                        multiple={true}
                        options={
                            categories && categories.map((category: IProductCategory) => ({
                                label: category.title as string,
                                value: category._id as unknown as string,
                            }))
                        }
                        required={true}
                        onChange={handleCategoryChange}

                    />}

                <button onClick={handleAddCategory}>Add Category</button>
                <div>
                    {categoriesList.map((category) => (
                        <div key={category.value} className="flex items-center justify-between">
                            <p>{category.label}</p>
                            <button onClick={() => handleRemoveCategory(category.value)}>Remove</button>
                        </div>
                    ))}
                </div>
            </div>
        </FormContainer>
    )



}

const step3 = ({ retrieveImagesList, retrieveImageData }: { retrieveImagesList: (list: string[]) => void; retrieveImageData: (data: ImageData[]) => void }) => {

    const [image, setImage] = useState<string>('')
    const [images, setImages] = useState<string[]>([])
    const [imageDataArray, setImageDataArray] = useState<ImageData[]>([])
    const { Trash } = usePhosphorIcons()


    const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value
        setImage((prev) => prev = value)
    }

    const handleAddImage = (e: React.MouseEvent) => {
        e.preventDefault()
        if (image) {
            if (images.find((img) => img === image)) {
                return
            }
            setImages([...images, image])
            setImage('')
        }
    }

    const handleRemoveImage = (name: string) => {
        setImages(images.filter((img) => img !== name))
    }

    useEffect(() => {
        images.length > 0 &&
            retrieveImagesList(images)
        imageDataArray.length > 0 &&
            retrieveImageData(imageDataArray)
    }, [images, imageDataArray])


    const handleImageFileUrls = (urls: string[], imageData: ImageData[]) => {
        setImages((prev) => [...prev, ...urls])
        setImageDataArray((prev) => [...prev, ...imageData])
        console.log('urls', urls);
        console.log('imageData', imageData);

    }

    const imageUrlToolTipContent = <div className=" w-full">
        <h6>Image URL</h6>
        <p className="text-xs">Enter the URL of the image you want to use.  Enter multiple urls, separated by commas</p>
        <p className="text-xs">.</p>
    </div>

    return (
        <div>
            <FormContainer title="Add Product Images" description={'Add image urls or upload image files. [.jpeg, .jpg, .png]'} >
                <form action="" className="w-full flex flex-col gap-6">

                    <div id='image-url-input-container'>
                        <ToolTipContainer id="image-url-tooltip" toolTipChildren={imageUrlToolTipContent}
                            classNames="w-full" mouseEnterTargetId="image-url-input">
                            <CustomInput id={'image-url-input'} type="text" name="image" label="Image URl"
                                placeholder="Add Image URL" value={image} onChange={handleImageChange} />
                        </ToolTipContainer>



                        {/* <button onClick={handleAddImage}>Add Image</button> */}
                        <ButtonWithIcon onClick={handleAddImage} label="Add Image Links" icon={<></>} />

                    </div>

                    <div>
                        <ImageUploadButton retrieveImageUrls={handleImageFileUrls} />
                    </div>

                    <div>
                        {images && images.length > 0 && images.map((image) => (
                            <div key={image} className="flex items-center justify-between">
                                <Image src={image} alt="product image" width={50} height={50} />
                                <button onClick={() => handleRemoveImage(image)}><Trash /></button>
                            </div>
                        ))}
                    </div>

                </form>
            </FormContainer>


        </div>
    )
}






// Main Component

export default function CreateNewProduct() {

    const [Step1formData, setStep1FormData] = useState<Step1FormData>({
        title: '',
        description: '',
        tagline: '',
        price: 0,
        discountPercentage: 0,
        stock: 0,
        inStock: true,
        active: true,
        isFeatured: false,
    })
    const [categoriesList, setCategoriesList] = useState<CustomSelectOptionsProps[]>([])
    const [imagesList, setImagesList] = useState<string[]>([])
    const [imageDataList, setImageDataList] = useState<ImageData[]>([])
    const [categoriesFromApi, setCategoriesFromApi] = useState<IProductCategory[]>([]);
    const { categories } = useStoreContext()
    const [nextClick, setNextClick] = useState<boolean>(false)
    const [errors, setErrors] = useState<boolean>(false)


    useEffect(() => {
        console.log('categories', categories);

        if (!categories) {
            return
        }
        if (categories) {

            setCategoriesFromApi(categories)
        }
    }, [categories])


    const steps = [step1(
        {
            retrieveData: (formData) => {
                setStep1FormData(formData)
            },
            nextClick: nextClick,
            retrieveErrors: (error) => {
                setErrors(error)
            }
        }),


    step2({
        retrieveCategoriesList: (list) => {
            setCategoriesList(list)
            if (list.length === 0) {
                setErrors(true)
            }
        },
        categories: categoriesFromApi as unknown as IProductCategory[]
    }),
    step3(
        {
            retrieveImagesList: (list) => {
                setImagesList(list)
            },
            retrieveImageData: (data) => {
                console.log('images data', data);
                setImageDataList(data)
            }
        }

    )]

    const { step, isFirstStep, isLastStep, nextStep, previousStep } = useMultiStepForm(steps)
    const router = useRouter()
    const handleFormsSave = (e: React.MouseEvent) => {
        e.preventDefault()

        let data = {
            ...Step1formData,
            categories: categoriesList.map((c) => c.value),
            image_urls: imagesList,
            images: imageDataList,
        }
        console.log(data)
        try {
            createProduct(data).then((res) => {
                console.log(res)
                if (res.status === 201) {
                    alert('Product Created Successfully')
                    toast.success('Product Created Successfully')
                    setStep1FormData({
                        title: '',
                        description: '',
                        tagline: '',
                        price: 0,
                        discountPercentage: 0,
                        stock: 0,
                        inStock: true,
                        active: true,
                        isFeatured: false,
                    })
                    router.push('/admin/products')
                    return
                }
            })
        }
        catch (error) {
            console.log(error)
            toast.error('Error Creating Product')
        }

    }

    // const [savedDisabled, setSaveDisabled] = useState<boolean>(true)
    // useEffect(() => {
    //     if (Step1formData.title && Step1formData.description && Step1formData.tagline && Step1formData.price && Step1formData.discountPercentage && Step1formData.stock
    //         && categoriesList.length > 0
    //         && imagesList.length > 0) {
    //         setSaveDisabled(false)
    //     } else {
    //         setSaveDisabled(true)
    //     }
    // })

    const handleNextClick = (e: React.MouseEvent) => {
        e.preventDefault();
        setNextClick(true);
        setTimeout(() => {
            setNextClick(false)
        }, 2000)

    }

    useEffect(() => {
        let timer = setTimeout(() => {
            if (!nextClick) return
            if (errors) return
            nextStep()
            setNextClick(false)
        }, 1000)
        return () => clearTimeout(timer)
    }, [nextClick, errors])



    return (
        <div>
            <h1 className="large">Create New Product ➕</h1>

            {categoriesFromApi ?
                <div>

                    <div className="">
                        {step}
                    </div>

                    <div className="grid grid-cols-3 mt-16">
                        {!isFirstStep() && <button onClick={previousStep}  >Prev</button>}
                        {!isLastStep() && <button onClick={handleNextClick}>Next</button>}
                        {isLastStep() && <button
                            // disabled={savedDisabled}
                            onClick={handleFormsSave}>Save</button>}
                    </div>

                </div>
                :
                <p>Loading Categories...</p>

            }


        </div >
    )
}