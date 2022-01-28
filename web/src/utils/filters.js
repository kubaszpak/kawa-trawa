export const filterProducts = (products, filters = []) => {
    return products.filter(product => !filters.some(filter => !filter(product)));
};

export const categoryFilter = category => product => category === product.category;

export const queryFilter = query => product =>
    product.name.toLowerCase().includes(query.toLowerCase()) ||
    (product.description && product.description.toLowerCase().includes(query.toLowerCase()));
