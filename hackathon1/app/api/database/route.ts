import { NextResponse } from "next/server";

let products = [
    {
        id: 1,
        productName: "Chuối",
        price: 100,
        image:"https://th.bing.com/th/id/OIP.oncFNO2K6TdxlmXzjjYz8gHaFj?w=240&h=180&c=7&r=0&o=5&dpr=1.4&pid=1.7",
        quantity: 5,
    },
    {
        id: 2,
        productName: "Xoài",
        price: 150,
        image: "https://th.bing.com/th?id=OIP.i-99Oym5-eLziLRmH0gvXgHaEc&w=322&h=193&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
        quantity: 10,
    },
    {
        id: 3,
        productName: "Cam",
        price: 200,
        image: "https://th.bing.com/th?id=OIP.gJz_BFBMZ44n9cDx2gTJdQHaD4&w=345&h=181&c=8&rs=1&qlt=90&o=6&dpr=1.4&pid=3.1&rm=2",
        quantity: 15,
    },
]
export async function GET() {
    return NextResponse.json( products);
}