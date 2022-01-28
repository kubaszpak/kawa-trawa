import React, { useCallback, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { CategoriesApi } from "../api/CategoriesApi";
import ProductsList from "./ProductsList";

export default function CategoryPage() {
	let params = useParams();
	const [category, setCategory] = useState(null);

	const fetchCategory = async () => {
		const { data } = await CategoriesApi.getCategory(params.categoryId);
		return data;
	};

	const updateCategory = useCallback(async () => {
		const fetchedCategory = await fetchCategory();
		setCategory(fetchedCategory);
	}, []);

	useEffect(() => {
		updateCategory();
	}, [updateCategory]);

	return <ProductsList products={category?.products || []} />
}
