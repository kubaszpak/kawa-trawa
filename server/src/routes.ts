import AddressController from "./controller/AddressController";
import ComplaintController from "./controller/ComplaintController";
import UserController from "./controller/UserController";
import AuthController from "./controller/AuthController";
import { accessTokenMiddleware, refreshTokenMiddleware, verifiedOnly, empOnly, unBannedOnly } from "./authentication/middleware";
import CategoryController from "./controller/CategoryController";
import ProductController from "./controller/ProductController";
import OrderController from "./controller/OrderController";
import CouponController from "./controller/CouponController";
import DiscountController from "./controller/DiscountController";

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
    method: "patch",
    route: "/users/:id",
    controller: UserController,
    middleware: [accessTokenMiddleware],
    action: "edit"
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
    method: "patch",
    route: "/addresses/:id",
    controller: AddressController,
    middleware: [accessTokenMiddleware],
    action: "edit"
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
    middleware: [],
    action: "login"
}, {
    method: "get",
    route: "/auth/confirmRegistration",
    controller: AuthController,
    middleware: [],
    action: "confirmRegistration"
}, {
    method: "post",
    route: "/auth/resetPasswordRequest",
    controller: AuthController,
    middleware: [],
    action: "resetPasswordRequest"
}, {
    method: "get",
    route: "/auth/resetPassword",
    controller: AuthController,
    middleware: [],
    action: "resetPassword"
}, {
    method: "post",
    route: "/auth/refresh",
    controller: AuthController,
    middleware: [refreshTokenMiddleware],
    action: "refresh"
}, {
    method: "get",
    route: "/products",
    controller: ProductController,
    middleware: [],
    action: "all"
}, {
    method: "get",
    route: "/products/:id",
    controller: ProductController,
    middleware: [],
    action: "one"
}, {
    method: "post",
    route: "/products",
    controller: ProductController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "save"
}, {
    method: "delete",
    route: "/products/:id",
    controller: ProductController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "remove"
}, {
    method: "get",
    route: "/orders",
    controller: OrderController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "all"
}, {
    method: "get",
    route: "/orders/:id",
    controller: OrderController,
    middleware: [accessTokenMiddleware],
    action: "one"
}, {
    method: "post",
    route: "/orders",
    controller: OrderController,
    middleware: [accessTokenMiddleware, verifiedOnly],
    action: "save"
}, {
    method: "delete",
    route: "/orders/:id",
    controller: OrderController,
    middleware: [accessTokenMiddleware, verifiedOnly],
    action: "remove"
}, {
    method: "get",
    route: "/categories",
    controller: CategoryController,
    middleware: [],
    action: "all"
}, {
    method: "get",
    route: "/categories/:id",
    controller: CategoryController,
    middleware: [accessTokenMiddleware],
    action: "one"
}, {
    method: "post",
    route: "/categories",
    controller: CategoryController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "save"
}, {
    method: "delete",
    route: "/categories/:id",
    controller: CategoryController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "remove"
}, {
    method: "get",
    route: "/discounts",
    controller: DiscountController,
    middleware: [],
    action: "all"
}, {
    method: "get",
    route: "/discounts/:id",
    controller: DiscountController,
    middleware: [],
    action: "one"
}, {
    method: "post",
    route: "/discounts",
    controller: DiscountController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "save"
}, {
    method: "delete",
    route: "/discounts/:id",
    controller: DiscountController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "remove"
}, {
    method: "get",
    route: "/complaints",
    controller: ComplaintController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "all"
}, {
    method: "get",
    route: "/complaints/:id",
    controller: ComplaintController,
    middleware: [accessTokenMiddleware],
    action: "one"
}, {
    method: "post",
    route: "/complaints",
    controller: ComplaintController,
    middleware: [accessTokenMiddleware, verifiedOnly],
    action: "save"
}, {
    method: "delete",
    route: "/complaints/:id",
    controller: ComplaintController,
    middleware: [accessTokenMiddleware, unBannedOnly],
    action: "remove"
}, {
    method: "get",
    route: "/coupons",
    controller: CouponController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "all"
}, {
    method: "get",
    route: "/coupons/:id",
    controller: CouponController,
    middleware: [accessTokenMiddleware, verifiedOnly],
    action: "one"
}, {
    method: "post",
    route: "/coupons",
    controller: CouponController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "save"
}, {
    method: "delete",
    route: "/coupons/:id",
    controller: CouponController,
    middleware: [accessTokenMiddleware, empOnly],
    action: "remove"
}];
