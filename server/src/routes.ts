import AddressController from "./controller/AddressController";
import UserController from "./controller/UserController";

export const Routes = [{
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
    method: "get",
    route: "/addresses",
    controller: AddressController,
    action: "all"
}, {
    method: "post",
    route: "/addresses",
    controller: AddressController,
    action: "save"
}];