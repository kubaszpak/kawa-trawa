import API, { authHeader } from "./ApiConnector";

export class ProductsAPI {
    static getProducts() {
        return API.get("/products", authHeader());
    }
}
