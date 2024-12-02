import mongoose, { Schema, Document } from 'mongoose';



export interface IProductCategory {
    _id?: Schema.Types.ObjectId;
    title?: string;
    description?: string;
    tagline?: string;
    active?: boolean;

    createDate?: Date;
    updateDate?: Date;
    deleteDate?: Date;


}

const ProductCategorySchema: Schema = new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    tagline: { type: String, required: true },
    active: { type: Boolean, required: true, default: true },

    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },

});

const ProductCategoryModel = mongoose.models.ProductCategory || mongoose.model<IProductCategory>('ProductCategory', ProductCategorySchema);

export { ProductCategoryModel, ProductCategorySchema };