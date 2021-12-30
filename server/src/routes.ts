import AddressController from "./controller/AddressController";
import ComplaintController from "./controller/ComplaintController";
import UserController from "./controller/UserController";

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
}
];