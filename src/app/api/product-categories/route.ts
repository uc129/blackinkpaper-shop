import { NextRequest, NextResponse } from "next/server";
import { ProductCategoryModel } from "./categories.model";
import { connect } from "../dbconfig";


connect();


export async function POST(req: NextRequest) {
    try {
        const { title, description, tagline } = await req.json();

        const newProductCategory = new ProductCategoryModel({
            title,
            description,
            tagline,
        });
        try {
            await newProductCategory.save();
        }
        catch (error) {
            NextResponse.json({ error: error });
        }
        return NextResponse.json({ message: 'Product Category created successfully', status: 201, data: newProductCategory });
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}


export async function GET(req: NextRequest) {
    let url = new URL(req.url);
    let id = url.searchParams.get('id');
    console.log('id', id);
    try {
        const productCategories = await ProductCategoryModel.findById({ _id: id });
        if (!productCategories) {
            return NextResponse.json({ message: 'Product Category not found', status: 404 });
        }
        return NextResponse.json({ message: 'Product Category found', status: 200, data: productCategories });
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}



export async function PUT(req: NextRequest) {
    let { id, title, description, tagline } = await req.json();
    try {
        const productCategory = await ProductCategoryModel.findById({ _id: id });
        if (!productCategory) {
            return NextResponse.json({ message: 'Product Category not found', status: 404 });
        }

        title && (productCategory.title = title);
        description && (productCategory.description = description);
        tagline && (productCategory.tagline = tagline);

        try {
            await productCategory.save();
        }
        catch (error) {
            return NextResponse.json({ error: error, status: 500 });
        }
        return NextResponse.json({ message: 'Product Category updated successfully', status: 200, data: productCategory });
    }
    catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}

export async function DELETE(req: NextRequest) {
    let { id } = await req.json();
    try {
        const productCategory = await ProductCategoryModel.findById({ _id: id });
        if (!productCategory) {
            return NextResponse.json({ message: 'Product Category not found', status: 404 });
        }
        productCategory.deleteDate = new Date();
        productCategory.active = false;
        try {
            await productCategory.save();
        }
        catch (error) {
            return NextResponse.json({ error: error, status: 500 });
        }
        return NextResponse.json({ message: 'Product Category deleted successfully', status: 200, data: productCategory });
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}

