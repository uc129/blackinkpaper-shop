'use client'
import { IProductCategory } from "@/app/api/product-categories/categories.model"
import { CustomCheckbox } from "@/app/components/form-components/checkbox"
import CustomInput from "@/app/components/form-components/input"
import { useMultiStepForm } from "@/app/components/form-components/multistepformHook"
import CustomSelect, { CustomSelectOptionsProps } from "@/app/components/form-components/select"
import { getAllProductCategories } from "@/app/lib/data-access/product-categories"
import { createProduct } from "@/app/lib/data-access/products"
import { useEffect, useState } from "react"
import toast from "react-hot-toast"
import { useRouter } from "next/navigation"
import { useStoreContext } from "@/app/lib/data-store/store"


interface Step1FormData {
    title: string
    description: string
    tagline: string
    price: number
    discountPercentage: number
    stock: number
    inStock: boolean
    active: boolean
}



// Form Steps

const step1 = ({ retrieveData }: { retrieveData: (formData: Step1FormData) => void }) => {

    const [formData, setFormData] = useState<Step1FormData>({
        title: '',
        description: '',
        tagline: '',
        price: 0,
        discountPercentage: 0,
        stock: 100,
        inStock: true,
        active: true,
        // image_urls: [],
    })

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {

        if (e.target.name === 'inStock' || e.target.name === 'active') {
            setFormData({
                ...formData,
                [e.target.name]: e.target.checked,
            })
            return
        }

        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        })
    }

    useEffect(() => {
        if (formData.title && formData.description && formData.tagline && formData.price && formData.discountPercentage && formData.stock) {
            retrieveData(formData)
        }
    })


    return (
        <form>
            <CustomInput type="text" name="title" label="Title" placeholder="Title" value={formData.title} onChange={handleChange} />
            <CustomInput type="text" name="description" label="Description" placeholder="Description" value={formData.description} onChange={handleChange} />
            <CustomInput type="text" name="tagline" label="Tagline" placeholder="Tagline" value={formData.tagline} onChange={handleChange} />
            <CustomInput type="number" name="price" label="Price" placeholder="Price" value={formData.price} onChange={handleChange} />
            <CustomInput type="number" name="discountPercentage" label="Discount Percentage" placeholder="Discount Percentage" value={formData.discountPercentage} onChange={handleChange} />
            <CustomInput type="number" name="stock" label="Stock" placeholder="Stock" value={formData.stock} onChange={handleChange} />
            <CustomCheckbox name="inStock" label="In Stock" value={formData.inStock} onChange={handleChange} />
            <CustomCheckbox name="active" label="Active" value={formData.active} onChange={handleChange} />

        </form>
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
        <div>
            <h1>Select Product Categories</h1>
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
    )



}

const step3 = ({ retrieveImagesList }: { retrieveImagesList: (list: string[]) => void }) => {

    const [image, setImage] = useState<string>('')
    const [images, setImages] = useState<string[]>([])


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
    })

    return (
        <div>
            <h1>Add Product Images</h1>

            <form action="">

                <CustomInput type="text" name="image" label="Image URl" placeholder="Image URL" value={image} onChange={handleImageChange} />
                <button onClick={handleAddImage}>Add Image</button>
                <div>
                    {images.map((image) => (
                        <div key={image} className="flex items-center justify-between">
                            <p>{image}</p>
                            <button onClick={() => handleRemoveImage(image)}>Remove</button>
                        </div>
                    ))}
                </div>



            </form>
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
    })
    const [categoriesList, setCategoriesList] = useState<CustomSelectOptionsProps[]>([])
    const [imagesList, setImagesList] = useState<string[]>([])

    const [categoriesFromApi, setCategoriesFromApi] = useState<IProductCategory[]>([]);

    const { categories } = useStoreContext()

    useEffect(() => {
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
            }
        }),


    step2({
        retrieveCategoriesList: (list) => {
            setCategoriesList(list)
        },
        categories: categoriesFromApi as unknown as IProductCategory[]
    }),
    step3(
        {
            retrieveImagesList: (list) => {
                setImagesList(list)
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

    const [savedDisabled, setSaveDisabled] = useState<boolean>(true)
    useEffect(() => {
        if (Step1formData.title && Step1formData.description && Step1formData.tagline && Step1formData.price && Step1formData.discountPercentage && Step1formData.stock
            && categoriesList.length > 0
            && imagesList.length > 0) {
            setSaveDisabled(false)
        } else {
            setSaveDisabled(true)
        }
    })




    return (
        <div>
            <h1>Create New Product</h1>

            {categoriesFromApi ?
                <div>

                    <div className="">
                        {step}
                    </div>

                    <div className="grid grid-cols-3 mt-16">
                        {!isFirstStep() && <button onClick={previousStep}  >Prev</button>}
                        {!isLastStep() && <button onClick={nextStep} >Next</button>}
                        {isLastStep() && <button disabled={savedDisabled} onClick={handleFormsSave}>Save</button>}
                    </div>

                </div>
                :
                <p>Loading Categories...</p>
            }


        </div >
    )
}