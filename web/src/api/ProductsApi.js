import API, { authHeader } from "./ApiConnector";

export class ProductsApi {
    static getProducts() {
        return API.get("/products", authHeader());
    }

    static async addProduct(product) {
        return API.post("/products", product, authHeader());
    }

    static async editProduct(product) {
        return API.patch(`/products/${product.id}`, product, authHeader());
    }

}
