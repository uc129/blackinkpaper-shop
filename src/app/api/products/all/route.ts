import { NextRequest, NextResponse } from "next/server";
import { ProductModel } from "../products.model";
import { connect } from "../../dbconfig";




export async function GET(req: NextRequest) {
    await connect();
    try {
        let allProducts = await ProductModel.find({});
        if (!allProducts) {
            return NextResponse.json({ message: 'No products found', status: 404 });
        }
        return NextResponse.json({ message: 'All products found', status: 200, data: allProducts });
    }
    catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }

}