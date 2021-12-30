import AddressController from "./controller/AddressController";
import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";

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
}, {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    action: "register"
}];
