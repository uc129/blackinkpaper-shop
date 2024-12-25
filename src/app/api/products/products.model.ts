import { ImageData } from '@/app/components/buttons/upload-image-button';
import mongoose, { Schema, Document } from 'mongoose';


export interface IProduct {
    _id?: Schema.Types.ObjectId;
    title: string;
    description: string;
    tagline: string;

    price: number;
    discountPercentage: number;

    stock: number;
    inStock: boolean;
    active: boolean;
    isFeatured: boolean;


    image_urls: string[];
    images: ImageData[];

    categories: Schema.Types.ObjectId[];
    tags?: Schema.Types.ObjectId[];
    reviews?: Schema.Types.ObjectId[];

    createDate?: Date;
    updateDate?: Date;
    deleteDate?: Date;

    rating?: number;
    totalPurchaseCount?: number;

    colour_pallette?: string[];
    features?: string[];
    used_tools?: string[];
    featuringCompanies?: string[]


}


const ProductSchema: Schema = new Schema({

    title: { type: String, required: true },
    description: { type: String, required: true },
    tagline: { type: String, required: true },

    price: { type: Number, required: true },
    discountPercentage: { type: Number, required: true },

    stock: { type: Number, required: true },
    inStock: { type: Boolean, required: true, default: true },

    active: { type: Boolean, required: true, default: true },
    isFeatured: { type: Boolean, required: true, default: false },
    featuringCompanies: { type: [String], required: false },

    colour_pallette: { type: [String], required: false }, //key colors of the product//hex values
    features: { type: [String], required: false }, //key features of the product
    used_tools: { type: [String], required: false }, //key tools used in the product

    image_urls: { type: [String], required: true },

    images: [{
        publicId: { type: String, required: true },
        url: { type: String, required: true },
        secure_url: { type: String, required: true },
        original_filename: { type: String, required: false },
    }],

    categories: { type: [Schema.Types.ObjectId], ref: 'ProductCategory', required: true },


    tags: { type: [Schema.Types.ObjectId], ref: 'ProductTag' },
    reviews: { type: [Schema.Types.ObjectId], ref: 'ProductReview' },


    createDate: { type: Date, default: Date.now },
    updateDate: { type: Date, default: Date.now },
    deleteDate: { type: Date, default: null },

    rating: { type: Number },
    totalPurchaseCount: { type: Number },
});

const ProductModel = mongoose.models.Product || mongoose.model<IProduct>('Product', ProductSchema);

export { ProductModel, ProductSchema };