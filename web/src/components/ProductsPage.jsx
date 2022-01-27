import React, { useEffect, useCallback, useState } from 'react';
import { ProductsAPI } from '../api/ProductsApi';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await ProductsAPI.getProducts();
        return data;
    }

    const updateShop = useCallback(async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
    }, []);

    useEffect(() => {
        updateShop();
    }, [updateShop]);

    return <>
        <h1>Products page</h1>
        {products.map((product, index) =>
            <div key={index} >
                <p>name: {product.name}</p>
                <p>description: {product.description}</p>
            </div>
        )}
    </>;
}

export default ProductsPage;
