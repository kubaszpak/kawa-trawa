import React, { useState, useEffect, useCallback } from "react";
import { ProductsApi } from "../api/ProductsApi";

import ProductsList from "./ProductsList";

const ProductsPage = ({ addProductToCart }) => {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        const { data } = await ProductsApi.getProducts();
        return [...data];
    };

    const updateShop = useCallback(async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
    }, []);

    useEffect(() => {
        updateShop();
    }, [updateShop]);

    return <ProductsList addProductToCart={addProductToCart} products={products} setProducts={setProducts} onDelete={updateShop} />
};

export default ProductsPage;
