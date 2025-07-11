import React, { useState, useEffect } from "react";
import { ProductsApi } from "../../api/ProductsApi";

import ProductsList from "./ProductsList";

const ProductsPage = ({ addProductToCart }) => {
  const [products, setProducts] = useState([]);
  const [update, setUpdate] = useState();

  useEffect(() => {
    const fetchProducts = async () => {
      const { data } = await ProductsApi.getProducts();
      setProducts(data);
    };
    fetchProducts();
  }, [update]);

  return (
    <ProductsList
      addProductToCart={addProductToCart}
      products={products}
      setProducts={setProducts}
      onDelete={() => setUpdate((prev) => !prev)}
    />
  );
};

export default ProductsPage;
