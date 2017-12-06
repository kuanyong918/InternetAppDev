"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var common_1 = require("@angular/common");
var platform_browser_1 = require("@angular/platform-browser");
var app_component_1 = require("./app.component");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var http_1 = require("@angular/http");
var app_routing_1 = require("./app.routing");
//import { UserComponent } from './components/user.component';
//import { HomeComponent } from './components/home.component';
//import { UserService } from './Service/user.service';
var register_service_1 = require("./Service/register.service");
var register_component_1 = require("./components/register.component");
var forgotPassword_service_1 = require("./Service/forgotPassword.service");
var company_service_1 = require("./Service/company.service");
var company_component_1 = require("./components/company.component");
//import { SupplierService } from './Service/supplier.service';
//import { SupplierComponent } from './components/supplier.component';
var product_service_1 = require("./Service/product.service");
var product_component_1 = require("./components/product.component");
var user_pipe_1 = require("./filter/user.pipe");
var company_pipe_1 = require("./filter/company.pipe");
var product_pipe_1 = require("./filter/product.pipe");
var search_component_1 = require("./Shared/search.component");
var productItem_component_1 = require("./Components/productItem.component");
var productItem_service_1 = require("./Service/productItem.service");
var forms_1 = require("@angular/forms");
var forgotPassword_component_1 = require("./components/forgotPassword.component");
var order_component_1 = require("./components/order.component");
var order_service_1 = require("./Service/order.service");
var login_component_1 = require("./components/login.component");
var AppModule = (function () {
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, forms_1.FormsModule, http_1.HttpModule, app_routing_1.routing, ng2_bs3_modal_1.Ng2Bs3ModalModule],
        declarations: [app_component_1.AppComponent, login_component_1.LoginComponent, product_component_1.ProductComponent, user_pipe_1.UserFilterPipe, product_pipe_1.ProductFilterPipe, company_pipe_1.CompanyFilterPipe, search_component_1.SearchComponent, productItem_component_1.ProductItemComponent, forgotPassword_component_1.ForgotPasswordComponent, company_component_1.CompanyComponent, register_component_1.RegisterComponent, order_component_1.OrderComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, product_service_1.ProductService, productItem_service_1.ProductItemService, forgotPassword_service_1.forgotPasswordService, company_service_1.CompanyService, register_service_1.RegisterService, order_service_1.OrderService],
        bootstrap: [app_component_1.AppComponent]
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map