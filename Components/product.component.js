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
var core_1 = require("@angular/core");
var product_service_1 = require("../Service/product.service");
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var router_1 = require("@angular/router");
var productItem_1 = require("../Model/productItem");
var shoppingCart_1 = require("../Model/shoppingCart");
var ProductComponent = (function () {
    function ProductComponent(fb, _productService, router) {
        this.fb = fb;
        this._productService = _productService;
        this.router = router;
        // users: IUser[];
        this.selectedProducts = [];
        this.indLoading = false;
        this.searchTitle = "Search Product";
        this.clickMessage = '';
        this.valid = false;
        ////////////////////SHopping cart stuff////////////////////////////////////////////////////////
        this.cartNav = function () {
            this.router.navigateByUrl('/productItem');
        };
    }
    ProductComponent.prototype.ngOnInit = function () {
        this.productFrm = this.fb.group({
            Id: [''],
            MaterialID: [''],
            Description: [''],
            Price: [''],
            SupplierName: [''],
            Imagepath: ['']
        });
        this.LoadProducts();
        this.cu = JSON.parse(sessionStorage.getItem("currentUser"));
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser")); //2
        if (currentUser == null) {
            this.clickMessage = 'You must login first';
            this.router.navigate(['/login']);
        }
        if (currentUser != null && (currentUser.Role == "superAdmin" || currentUser.Role == "supplierAdmin")) {
            this.valid = true;
        }
        // this.LoadShoppingCart();
    };
    ProductComponent.prototype.checkboxChanged = function (productIdString) {
        var productId = parseInt(productIdString);
        for (var i = 0; i < this.selectedProducts.length; i++) {
            if (this.selectedProducts[i].Id == productId) {
                this.selectedProducts.splice(i, 1);
                return;
            }
        }
        //find the user with userId first //if user is not in selected user list 
        var currentSelectedProduct = this.findProductById(productId);
        if (currentSelectedProduct != null)
            this.selectedProducts.push(currentSelectedProduct);
    };
    // everything unchecked
    ProductComponent.prototype.resetAll = function () {
    };
    ProductComponent.prototype.findProductById = function (productId) {
        for (var i = 0; i < this.products.length; i++) {
            if (this.products[i].Id == productId)
                return this.products[i];
        }
        return null;
    };
    ProductComponent.prototype.LoadShoppingCart = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); //load loggied in user
        // load user's cart'
        this.currentShoppingCart = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    };
    ////////////////////^^^^^^^^^^^^^^^^^SHopping cart stuff^^^^^^^^^^^^^^^^////////////////////////////////////////////////////////
    ProductComponent.prototype.LoadProducts = function () {
        var _this = this;
        this.indLoading = true;
        //   var currentUser = JSON.parse(sessionStorage.getItem("currentUser"));  //2
        this._productService.get(global_1.Global.BASE_PRODUCT_ENDPOINT)
            .subscribe(function (products) {
            _this.products = products;
            _this.indLoading = false;
        }, function (error) { return _this.msg = error; });
    };
    ProductComponent.prototype.logout = function () {
        sessionStorage.removeItem("currentUser");
        this.clickMessage = 'Logout Successfully!';
        this.router.navigate(['/login']);
    };
    ProductComponent.prototype.addProduct = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New Product";
        this.modalBtnTitle = "Add";
        this.productFrm.reset();
        this.modal.open();
    };
    ////////////////////SHopping cart stuff////////////////////////////////////////////////////////
    //gnerate random PO number
    ProductComponent.prototype.poNumber = function (len) {
        var text = " ";
        var charset = "-_abcdefghijklmnopqrstuvwxyz0123456789";
        for (var i = 0; i < len; i++)
            text += charset.charAt(Math.floor(Math.random() * charset.length));
        return text;
    };
    ProductComponent.prototype.purchaseItems = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get loggined in user
        var selectedProductItemList = this.covertProductListToProductItemList(this.selectedProducts);
        this.currentShoppingCart = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id)); // retrieve user's cart(if any)'
        if (this.currentShoppingCart == null) {
            this.currentShoppingCart = new shoppingCart_1.shoppingCart(); //create a new cart
            this.currentShoppingCart.orderId = this.poNumber(15); // generate 8 letter/digit random code(for storage in database if user purchases cart stuff)
            this.currentShoppingCart.userId = this.currentUser.Id; //user id
            this.currentShoppingCart.userName = this.currentUser.Name; // added user name
            this.currentShoppingCart.productItemList = selectedProductItemList; //hold list of selected products
        }
        else {
            this.currentShoppingCart.productItemList = this.mergeItemList(this.currentShoppingCart.productItemList, selectedProductItemList); // combine existing products with added products
        }
        localStorage.setItem("currentShoppingCart" + this.currentUser.Id, JSON.stringify(this.currentShoppingCart)); //add/update user's cart to/in localstorage'
    };
    ProductComponent.prototype.covertProductListToProductItemList = function (selectedProducts) {
        var productItemList = [];
        for (var i = 0; i < selectedProducts.length; i++) {
            var tempProductItem = new productItem_1.productItem();
            tempProductItem.Quantity = 1;
            tempProductItem.product = selectedProducts[i];
            tempProductItem.SubTotal = tempProductItem.product.Price * tempProductItem.Quantity; // get subtotal for each product  
            productItemList.push(tempProductItem);
        }
        return productItemList;
    };
    ProductComponent.prototype.mergeItemList = function (existingItems, newItemList) {
        var matchingFlag = false;
        for (var i = 0; i < existingItems.length; i++) {
            var currentItem = existingItems[i];
            matchingFlag = false;
            for (var j = 0; j < newItemList.length; j++) {
                if (currentItem.product.Id == newItemList[j].product.Id) {
                    matchingFlag = true;
                    newItemList[j].Quantity = currentItem.Quantity + newItemList[j].Quantity; // update quantity number if same product added again
                    newItemList[j].SubTotal = currentItem.SubTotal + newItemList[j].SubTotal; //update subtotal               
                    break;
                }
            }
            if (!matchingFlag) {
                newItemList.push(currentItem);
            }
        }
        return newItemList;
    };
    ////////////////////^^^^^^^^^6SHopping cart stuff ^^^^^^^^^////////////////////////////////////////////////////////
    ProductComponent.prototype.editProduct = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit Product";
        this.modalBtnTitle = "Update";
        this.product = this.products.filter(function (x) { return x.Id == id; })[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    };
    ProductComponent.prototype.deleteProduct = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.product = this.products.filter(function (x) { return x.Id == id; })[0];
        this.productFrm.setValue(this.product);
        this.modal.open();
    };
    ProductComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._productService.post(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.update:
                this._productService.put(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
            case enum_1.DBOperation.delete:
                this._productService.delete(global_1.Global.BASE_PRODUCT_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadProducts();
                    }
                    else {
                        _this.msg = "There is some issue in saving records, please contact to system administrator!";
                    }
                    _this.modal.dismiss();
                }, function (error) {
                    _this.msg = error;
                });
                break;
        }
    };
    ProductComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.productFrm.enable() : this.productFrm.disable();
    };
    ProductComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return ProductComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], ProductComponent.prototype, "modal", void 0);
ProductComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/product.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, product_service_1.ProductService, router_1.Router])
], ProductComponent);
exports.ProductComponent = ProductComponent;
//# sourceMappingURL=product.component.js.map