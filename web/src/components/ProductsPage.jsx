import React, { useEffect, useCallback, useState } from "react";
import { ProductsAPI } from "../api/ProductsApi";
import Grid from "@mui/material/Grid";
import ProductCard from "./ProductCard";
import { Typography, Select, MenuItem, Paper, Box } from "@mui/material";
import { makeStyles } from '@mui/styles';

const ProductsPage = () => {
    const classes = useStyles();
    const [products, setProducts] = useState([]);
    const [sortMode, setSortMode] = useState("price-asc");

    const fetchProducts = async () => {
        const { data } = await ProductsAPI.getProducts();
        return [...data];
    };

    const updateShop = useCallback(async () => {
        const fetchedProducts = await fetchProducts();
        setProducts(fetchedProducts);
    }, []);

    useEffect(() => {
        updateShop();
    }, [updateShop]);

    const sortProducts = (property, ascending) => {
        let newProducts = [...products];
        if (ascending) {
            newProducts.sort((a, b) => a[property] - b[property]);
        } else {
            newProducts.sort((a, b) => b[property] - a[property]);
        }
        setProducts(newProducts);
    }

    const handleChange = (event) => {
        const newSortMode = event.target.value;

        switch (newSortMode) {
            case "price-asc":
                sortProducts("price", true);
                break;
            case "price-desc":
                sortProducts("price", false);
                break;
        }

        setSortMode(newSortMode);
    };

    return (
        <>
            <Box className={classes.justifyCenter}>
                <Paper className={classes.sortPaper}>
                    <Box className={classes.alignCenter}>
                        <Typography variant="body1" display="inline">{"Sortuj wg:\u00A0"}</Typography>
                        <Select
                            className={classes.text}
                            value={sortMode}
                            label="Age"
                            onChange={handleChange}
                        >
                            <MenuItem value={"price-asc"}>Ceny rosnąco</MenuItem>
                            <MenuItem value={"price-desc"}>Ceny malejąco</MenuItem>
                        </Select>
                    </Box>
                </Paper>
            </Box>

            <Box className={classes.productGrid}>
                <Grid container rowSpacing={2} columnSpacing={2} >
                    {products.map((product, index) => (
                        <Grid item xs={12} sm={6} md={4} xl={3} key={index}>
                            <ProductCard key={index} product={product} />
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </>
    );
};

const useStyles = makeStyles(theme => ({
    text: {
        color: "white",
        borderColor: 'white',
    },
    sortPaper: {
        padding: theme.spacing(1),
        marginBottom: theme.spacing(1)
    },
    alignCenter: {
        display: "flex",
        alignItems: "center",
    },
    justifyCenter: {
        display: "flex",
        justifyContent: "center",
    },
    productGrid: {
        marginRight: theme.spacing(2),
        marginLeft: theme.spacing(2)
    }
}));

export default ProductsPage;
