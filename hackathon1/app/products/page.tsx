"use client"
import axios from 'axios';
import React, { useEffect, useState } from 'react';

interface Product {
    id: number;
    productName: string;
    price: number;
    quantity: number;
    image: string;
}

export default function ProductsPage() {
    const [products, setProducts] = useState<Product[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [newProductName, setNewProductName] = useState('');
    const [newImage, setNewImage] = useState('');
    const [newPrice, setNewPrice] = useState('');
    const [newQuantity, setNewQuantity] = useState('');
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:3000/api/products');
                setProducts(response.data);
            } catch (error) {
                console.error( error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchProducts();
    }, []);

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
    };

    const handleDeleteProduct = async (id: number) => {
        try {
            await axios.delete(`http://localhost:3000/api/products/${id}`);
            const updatedProducts = products.filter((product) => product.id !== id);

            setProducts(updatedProducts);
        } catch (error) {
            console.error(error);
        }
    };
    const handleAddProduct = async () => {
        try {
            const newProduct = {
                productName: newProductName,
                image: newImage,
                price: parseFloat(newPrice),
                quantity: parseInt(newQuantity),
            };

            const response = await axios.post('http://localhost:3000/api/products', newProduct);
            setProducts([...products, response.data]);
            setNewProductName('');
            setNewImage('');
            setNewPrice('');
            setNewQuantity('');
        } catch (error) {
            console.error( error);
        }
    };
    const handleEditProduct = (product: Product) => {
        setEditingProduct(product);
        setNewProductName(product.productName);
        setNewImage(product.image);
        setNewPrice(product.price.toString());
        setNewQuantity(product.quantity.toString());
    };
    const filteredProducts = searchTerm
        ? products.filter((product) =>
            product.productName.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : products;

    return (
        <div>
            <h1>Quản lý sản phẩm</h1>

            <div className="add-product-form">
                <h2>Thêm sản phẩm</h2>
                <div className="form-group">
                    <label htmlFor="productName">Tên sản phẩm:</label>
                    <input
                        type="text"
                        id="productName"
                        value={newProductName}
                        onChange={(e) => setNewProductName(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="image">Hình ảnh:</label>
                    <input
                        type="text"
                        id="image"
                        value={newImage}
                        onChange={(e) => setNewImage(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="price">Giá:</label>
                    <input
                        type="number"
                        id="price"
                        value={newPrice}
                        onChange={(e) => setNewPrice(e.target.value)}
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="quantity">Số lượng:</label>
                    <input
                        type="number"
                        id="quantity"
                        value={newQuantity}
                        onChange={(e) => setNewQuantity(e.target.value)}
                    />
                </div>
                <button onClick={handleAddProduct} className="btn btn-primary">
                    Thêm
                </button>
            </div>

            <div className="search-bar">
                <input
                    type="text"
                    placeholder="Tìm kiếm sản phẩm..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                />
            </div>

            {isLoading ? (
                <p>Đang tải dữ liệu...</p>
            ) : (
                <table className="table">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Tên sản phẩm</th>
                            <th>Hình ảnh</th>
                            <th>Giá</th>
                            <th>Số lượng</th>
                            <th>Hành động</th>
                        </tr>
                    </thead>
                    <tbody>
                        {filteredProducts.map((product) => (
                            <tr key={product.id}>
                                <td>{product.id}</td>
                                <td>{product.productName}</td>
                                <td>
                                    <img src={product.image} alt={product.productName} width="50" />
                                </td>
                                <td>{product.price}</td>
                                <td>{product.quantity}</td>
                                <td>
                                    <button
                                        onClick={() => handleDeleteProduct(product.id)}
                                        className="btn btn-danger"
                                    >
                                        Xóa
                                    </button>
                                    <button
                                        onClick={() => handleEditProduct(product)}
                                        className="btn btn-warning"
                                    >
                                        Sửa
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            )}
        </div>
    );
}