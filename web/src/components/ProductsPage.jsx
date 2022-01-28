import React, { useState, useEffect, useCallback } from "react";
import { ProductsApi } from "../api/ProductsApi";

import ProductsList from "./ProductsList";

const ProductsPage = () => {
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

    return <ProductsList products={products} setProducts={setProducts} />
};

export default ProductsPage;
