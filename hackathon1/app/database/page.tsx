"use client"
import axios from 'axios'
import React, { useEffect, useState } from 'react'

interface Product {
    id: number;
    productName: string;
    price: number;
    image: string;
    quantity: number;
}
const data=[]

export default function page() {
    const [products, setProducts] = useState<Product[]>([]);

    useEffect(() => {
        axios.get("http://localhost:3000/api/database")
            .then((response) => {
                console.log("data", response.data);
                setProducts(response.data); 
            })
            .catch((err) => {
                console.error(err);
            });
    }, []);

    return (
        <div>
            danh sách sản phẩm
            {products?.map((item: Product) => {
                return (
                    <div key={item.id}>
                        <p>tên: {item.productName}</p>
                        <p>giá: {item.price}</p>
                        <img src={item.image} alt={item.productName} />
                        <p>Số lượng: {item.quantity}</p>
                        <p>********************</p>
                    </div>
                )
            })}
        </div>
    )
}