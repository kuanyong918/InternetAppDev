"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core"); //pdf
var productItem_service_1 = require("../Service/productItem.service");
var forms_1 = require("@angular/forms");
var shoppingCart_1 = require("../Model/shoppingCart");
var router_1 = require("@angular/router"); // for cart page
//import { Cart } from '../Model/cart'; // cart item model
var ProductItemComponent = (function () {
    function ProductItemComponent(fb, _productItemService, router) {
        this.fb = fb;
        this._productItemService = _productItemService;
        this.router = router;
        this.items = []; //gets data from localstorage
        this.items2 = [];
        this.order = shoppingCart_1.shoppingCart;
        this.purge = function () {
            localStorage.clear();
            this.router.navigateByUrl('/product');
        };
        this.productNav = function () {
            this.router.navigateByUrl('/product');
        };
        this.orderNav = function () {
            this.router.navigateByUrl('/order');
        };
        this.clearLS = function () {
            localStorage.clear();
        };
    }
    ProductItemComponent.prototype.ngOnInit = function () {
        this.LoadShoppingCart();
        ;
    };
    ProductItemComponent.prototype.getTotal = function () {
    };
    ProductItemComponent.prototype.LoadShoppingCart = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined user fro msession storage       
        this.items = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); //retreive user's cart from local storage'
        //console.log(this.items); // array console picture on broswer 
        this.items2 = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    };
    ProductItemComponent.prototype.remove = function (id) {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined user fro msession storage       
        this.items = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); //retreive user's cart from local storage'
        var cart = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
        //let index: number = -1;
        for (var i = 0; i < cart.length; i++) {
            var item = JSON.parse(cart[i]);
            if (item.Id == id) {
                cart.splce(i, 1); //get rid od productitem index and its attributes
                //break;
            }
        }
        localStorage.setItem("currentShoppingCart" + this.currentUser.Id, JSON.stringify(cart)); // update cart
    };
    return ProductItemComponent;
}());
ProductItemComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/productItem.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, productItem_service_1.ProductItemService, router_1.Router])
], ProductItemComponent);
exports.ProductItemComponent = ProductItemComponent;
//# sourceMappingURL=productItem.component.js.map