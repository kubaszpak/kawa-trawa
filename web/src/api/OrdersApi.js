import API, { authHeader } from "./ApiConnector";

export class OrdersApi {
    static getOrder(id) {
        return API.get(`/order/${id}`, authHeader());
    }

    static getOrders() {
        return API.get("/orders/", authHeader());
    }
}
