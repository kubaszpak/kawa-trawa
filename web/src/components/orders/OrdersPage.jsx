import React, { useState, useEffect } from "react";
import { OrdersApi } from "../../api/OrdersApi";

import OrdersList from "./OrdersList";

const OrdersPage = () => {
	const [orders, setOrders] = useState([]);

	useEffect(() => {
		async function fetchOrders() {
			const { data } = await OrdersApi.getOrders();
			setOrders(data);
		}
		fetchOrders();
	}, [setOrders]);

	return <OrdersList orders={orders} setOrders={setOrders} />;
};

export default OrdersPage;
