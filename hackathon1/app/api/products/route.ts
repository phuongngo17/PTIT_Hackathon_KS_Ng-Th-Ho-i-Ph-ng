import { NextResponse } from "next/server";
import { v4 as uuidv4 } from 'uuid';
import {products} from "../../database/data"
export async function GET() {
    return NextResponse.json(products);
    
}
export async function POST(request: Request) {
    const body = await request.json();
    const { productName, image, price, quantity } = body;

    if (!productName || !image || !price || !quantity) {
        return NextResponse.json({ status: 400 });
    }

    const newProduct = {
        id: parseInt(uuidv4(), 10), 
        productName,
        image,
        price: parseFloat(price), 
        quantity: parseInt(quantity) 
    };

    products.push(newProduct);

    return NextResponse.json(newProduct, { status: 201 });
}
export async function PUT(request: Request) {
    const requestUrl = new URL(request.url);
    const id = requestUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json({ message: 'Missing product ID' }, { status: 400 });
    }

    const body = await request.json();
    const { productName, image, price, quantity } = body;

    if (!productName || !image || !price || !quantity) {
        return NextResponse.json({ message: 'Missing required fields' }, { status: 400 });
    }

    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex === -1) {
        return NextResponse.json({ message: 'Product not found' }, { status: 404 });
    }

    products[productIndex] = {
        id: parseInt(id),
        productName,
        image,
        price,
        quantity
    };

    return NextResponse.json(products[productIndex], { status: 200 });
}

export async function DELETE(request: Request) {
    const requestUrl = new URL(request.url);
    const id = requestUrl.searchParams.get('id');

    if (!id) {
        return NextResponse.json( { status: 400 });
    }

    const productIndex = products.findIndex(product => product.id === parseInt(id));

    if (productIndex === -1) {
        return NextResponse.json( { status: 404 });
    }

    products.splice(productIndex, 1);

    return NextResponse.json( { status: 204 });
}
