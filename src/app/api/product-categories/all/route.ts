/* eslint-disable */
import { NextResponse } from "next/server";
import { ProductCategoryModel } from "../categories.model";
import { connect } from "../../dbconfig";


export async function GET() {
    connect();

    if (!ProductCategoryModel) {
        return NextResponse.json({ message: 'Product Categories not found', status: 404 });
    }


    try {
        const productCategories = await ProductCategoryModel.find();
        return NextResponse.json({ message: 'Product Categories found', status: 200, data: productCategories });
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}