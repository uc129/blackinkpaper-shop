import { NextRequest, NextResponse } from 'next/server';
import { IProduct, ProductModel } from './products.model';
import { connect } from '../dbconfig';


export async function POST(req: NextRequest) {
    await connect();

    try {

        const { title, description, tagline, price, discountPercentage, stock, inStock, active,
            image_urls, categories, tags, isFeatured, images, colour_pallette, used_tools, features, featuringCompanies }: IProduct = await req.json();

        if (!title || !description || !tagline || !price || !image_urls || !categories || !images) {
            return NextResponse.json({ message: 'Please provide all required fields', status: 400 });
        }

        const newProduct = new ProductModel({
            title,
            description,
            tagline,
            price,
            discountPercentage,
            stock,
            inStock,
            isFeatured,
            active,
            image_urls,
            images,
            categories,
            tags,
            colour_pallette,
            features,
            used_tools,
            featuringCompanies
        });

        try {
            let product = await newProduct.save();
            console.log(product);
        }
        catch (error) {
            return NextResponse.json({ error: error, status: 500 });
        }
        return NextResponse.json({ message: 'Product created successfully', status: 201, data: newProduct });

    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}


export async function GET(req: NextRequest) {
    let { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    if (!id) {
        return NextResponse.json({ message: 'Please provide valid product id', status: 400 });
    }

    try {
        const product = await ProductModel.findById({ _id: id });
        if (!product) {
            return NextResponse.json({ message: 'Product not found', status: 404 });
        }
        return NextResponse.json({ message: 'Product found', status: 200, data: product });
    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}


export async function PUT(req: NextRequest) {
    let { id, title, description, tagline, price, discountPercentage, stock, inStock, active, image_urls, categories, tags, isFeatured,
        images, colour_pallette, features, used_tools, featuringCompanies
    } = await req.json();
    try {
        const product = await ProductModel.findById({ _id: id });
        if (!product) {
            return NextResponse.json({ message: 'Product not found', status: 404 });
        }
        title && (product.title = title);
        description && (product.description = description);
        tagline && (product.tagline = tagline);
        price && (product.price = price);
        discountPercentage && (product.discountPercentage = discountPercentage);
        stock && (product.stock = stock);
        inStock && (product.inStock = inStock);
        active && (product.active = active);
        image_urls && (product.image_urls = image_urls);
        categories && (product.categories = categories);
        tags && (product.tags = tags);
        isFeatured && (product.isFeatured = isFeatured);
        images && (product.images = images);
        colour_pallette && (product.colour_pallette = colour_pallette);
        features && (product.features = features);
        used_tools && (product.used_tools = used_tools);
        featuringCompanies && (product.featuringCompanies = featuringCompanies);



        try {
            await product.save();
        }
        catch (error) {
            NextResponse.json({ error: error, status: 500 });
        }
        return NextResponse.json({ message: 'Product updated successfully', status: 200, data: product });

    } catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}


export async function DELETE(req: NextRequest) {
    let { searchParams } = new URL(req.url);
    const id = searchParams.get('id');
    try {
        const product = await ProductModel.findByIdAndDelete({ _id: id });
        if (!product) {
            return NextResponse.json({ message: 'Product not found', status: 404 });
        }
        return NextResponse.json({ message: 'Product deleted successfully', status: 200, data: product });

    }
    catch (error) {
        return NextResponse.json({ error: error, status: 500 });
    }
}

