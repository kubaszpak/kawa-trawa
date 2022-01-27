import React, { useEffect, useCallback, useState } from 'react';
import { ProductsAPI } from '../api/ProductsApi';
import Grid from '@mui/material/Grid';
import ProductCard from './ProductCard';

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

    const sortProducts = (property, ascending = true) => {
        let newProducts = products;
        if (ascending) {
            newProducts.sort((a, b) => a[property] - b[property]);
        } else {
            newProducts.sort((a, b) => b[property] - a[property]);
        }
        setProducts(newProducts);
    }

    useEffect(() => {
        updateShop();
    }, [updateShop]);

    return <>
        <h1>Products page</h1>
        <Grid container rowSpacing={1} columnSpacing={1}>
            {products.map((product, index) =>
                <>
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} >
                        <ProductCard key={index} product={product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} >
                        <ProductCard key={index} product={product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} >
                        <ProductCard key={index} product={product} />
                    </Grid>
                    <Grid item xs={12} sm={6} md={4} xl={3} key={index} >
                        <ProductCard key={index} product={product} />
                    </Grid>

                </>
            )}
        </Grid>

    </>;
}

export default ProductsPage;
