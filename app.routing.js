"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router");
var product_component_1 = require("./components/product.component");
var productItem_component_1 = require("./Components/productItem.component");
var company_component_1 = require("./components/company.component");
var forgotPassword_component_1 = require("./components/forgotPassword.component");
var register_component_1 = require("./components/register.component");
var order_component_1 = require("./components/order.component");
var login_component_1 = require("./components/login.component");
var appRoutes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    { path: 'login', component: login_component_1.LoginComponent },
    { path: 'product', component: product_component_1.ProductComponent },
    { path: 'productItem', component: productItem_component_1.ProductItemComponent },
    { path: 'company', component: company_component_1.CompanyComponent },
    { path: 'forgotPassword', component: forgotPassword_component_1.ForgotPasswordComponent },
    { path: 'register', component: register_component_1.RegisterComponent },
    { path: 'order', component: order_component_1.OrderComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map