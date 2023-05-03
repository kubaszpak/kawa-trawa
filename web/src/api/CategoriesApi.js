import API, { authHeader } from "./ApiConnector";

export class CategoriesApi {
    static getCategory(id) {
        return API.get(`/categories/${id}`, authHeader());
    }

    static getCategories() {
        return API.get("/categories/", authHeader());
    }

    static getCategoryList() {
        return API.get("/categoryList");
    }
}
