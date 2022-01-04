import AddressController from "./controller/AddressController";
import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";
import { accessTokenMiddleware, refreshTokenMiddleware } from "./authentication/middleware";

export const Routes = [{
    method: "get",
    route: "/users",
    controller: UserController,
    middleware: [accessTokenMiddleware],
    action: "all"
}, {
    method: "get",
    route: "/users/:id",
    controller: UserController,
    middleware: [accessTokenMiddleware],
    action: "one"
}, {
    method: "delete",
    route: "/users/:id",
    controller: UserController,
    middleware: [accessTokenMiddleware],
    action: "remove"
}, {
    method: "get",
    route: "/addresses",
    controller: AddressController,
    middleware: [accessTokenMiddleware],
    action: "all"
}, {
    method: "post",
    route: "/addresses",
    controller: AddressController,
    middleware: [accessTokenMiddleware],
    action: "save"
}, {
    method: "post",
    route: "/auth/register",
    controller: AuthController,
    middleware: [],
    action: "register"
}, {
    method: "post",
    route: "/auth/login",
    controller: AuthController,
    middleware: [accessTokenMiddleware],
    action: "login"
}, {
    method: "post",
    route: "/auth/refresh",
    controller: AuthController,
    middleware: [refreshTokenMiddleware],
    action: "refresh"
}];
