import React, { useState, useEffect, useCallback } from "react";
import { OrdersApi } from "../api/OrdersApi";

import OrdersList from "./OrdersList";

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        const { data } = await OrdersApi.getOrders();
        console.log(data);


        return [...data];
    };

    const updateOrders = useCallback(async () => {
        const fetchedOrders = await fetchOrders();
        setOrders(fetchedOrders);
        orders.forEach(order =>{
            console.log(order.id)
        })
    }, []);

    useEffect(() => {
        updateOrders();
    }, [updateOrders]);

    return <OrdersList orders={orders} setOrders={setOrders} />
};

export default OrdersPage;
