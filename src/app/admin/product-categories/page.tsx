'use client'
import { AllCategoriesList } from "./all-categories-list";
import CreateCategoryForm from "./create-category-form";



const ManageProductCategoriesPage = () => {

    return (
        <div>
            <h1 className="mb-12">Manage Product Categories</h1>

            <div className="grid grid-cols-1 gap-6">
                <AllCategoriesList />
                <CreateCategoryForm />
            </div>


        </div>
    );
}


export default ManageProductCategoriesPage;