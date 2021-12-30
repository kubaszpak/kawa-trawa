import AddressController from "./controller/AddressController";
import ComplaintController from "./controller/ComplaintController";
import UserController from "./controller/UserController";
import CategoryController from "./controller/CategoryController";
import ProductController from "./controller/ProductController";
import OrderController from "./controller/OrderController";

export const Routes = [{
    //users
    method: "get",
    route: "/users",
    controller: UserController,
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    action: "one"
}, {
    method: "post",
    route: "/users",
    controller: UserController,
    action: "save"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    action: "remove"
}, {
    //adresses
    method: "get",
    route: "/addresses",
    controller: AddressController,
    action: "all"
}, {
    method: "post",
    route: "/addresses",
    controller: AddressController,
    action: "save"
},{
    //complaints
    method: "get",
    route: "/complaints",
    controller: ComplaintController,
    action: "all"
},{
    method: "get",
    route: "/complaints/:id",
    controller: ComplaintController,
    action: "one"
},{
    method: "post",
    route: "/complaints",
    controller: ComplaintController,
    action: "save"
},{
    method: "delete",
    route: "/complaints/:id",
    controller: ComplaintController,
    action: "remove"
},{
    //categories
    method: "get",
    route: "/categories",
    controller: CategoryController,
    action: "all"
},{
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    action: "one"
},{
    method: "post",
    route: "/categories",
    controller: CategoryController,
    action: "save"
},{
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    action: "remove"
},{
    //products
    method: "get",
    route: "/products",
    controller: ProductController,
    action: "all"
},{
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    action: "one"
},{
    method: "post",
    route: "/products",
    controller: ProductController,
    action: "save"
},{
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    action: "remove"
},{
    //orders
    method: "get",
    route: "/orders",
    controller: OrderController,
    action: "all"
},{
    method: "get",
    route: "/orders/:id",
    controller: OrderController,
    action: "one"
},{
    method: "post",
    route: "/orders",
    controller: OrderController,
    action: "save"
},{
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    action: "remove"
}
];