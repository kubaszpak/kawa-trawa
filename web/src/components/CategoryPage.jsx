import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesApi } from "../api/CategoriesApi";
import ProductsList from "./ProductsList";

export default function CategoryPage({ addProductToCart }) {
	let params = useParams();
	const [category, setCategory] = useState(null);

	const updateCategory = useCallback(async () => {
		const fetchCategory = async () => {
			const { data } = await CategoriesApi.getCategory(params.categoryId);
			return data;
		};
		const fetchedCategory = await fetchCategory();
		setCategory(fetchedCategory);
	}, [params.categoryId]);

	useEffect(() => {
		updateCategory();
	}, [updateCategory]);

	return (
		<ProductsList
			addProductToCart={addProductToCart}
			products={category?.products || []}
			onDelete={updateCategory}
		/>
	);
}
