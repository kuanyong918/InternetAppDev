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
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var router_1 = require("@angular/router");
var order_service_1 = require("../Service/order.service");
var OrderComponent = (function () {
    //router: Router
    function OrderComponent(fb, _orderService, router) {
        this.fb = fb;
        this._orderService = _orderService;
        this.router = router;
        this.currentOrder = [];
        this.indLoading = false;
        this.valid = false;
        this.clearLS = function () {
            localStorage.clear();
        };
    }
    OrderComponent.prototype.ngOnInit = function () {
        this.orderFrm = this.fb.group({
            Id: [''],
            orderId: [''],
            userId: [''],
            userName: [''],
            productItemList: ['']
        });
        ;
        //  (<HTMLInputElement>document.getElementById('orderNumber')).innerHTML = this.currentOrder.orderId;
        this.loadOrderPlaced(); //load  
        this.LoadOrders();
    };
    OrderComponent.prototype.ngAfterViewInit = function () {
        // (<HTMLInputElement>document.getElementById('orderNumber')).innerHTML = this.currentOrder.orderId;
        // this.addOrder();
        // this.modal.open();
    };
    OrderComponent.prototype.refresh = function () {
        window.location.reload();
    };
    OrderComponent.prototype.loadOrderPlaced = function () {
        this.currentUser = JSON.parse(sessionStorage.getItem("currentUser")); // get logged in user
        this.currentOrder = JSON.parse(localStorage.getItem("currentShoppingCart" + this.currentUser.Id));
    };
    OrderComponent.prototype.LoadOrders = function () {
        var _this = this;
        this.indLoading = true;
        this._orderService.get(global_1.Global.BASE_ORDER_ENDPOINT)
            .subscribe(function (orders) {
            _this.orders = orders;
            _this.indLoading = false;
        }, function (error) { return _this.msg = error; });
    };
    OrderComponent.prototype.addOrder = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Finalize Order";
        this.modalBtnTitle = "Finalize";
        this.orderFrm.reset();
        /* (<HTMLInputElement>document.getElementById('orderId1')).value = this.currentOrder.orderId;
         (<HTMLInputElement>document.getElementById('userId1')).value = this.currentOrder.userId;
         (<HTMLInputElement>document.getElementById('userName1')).value = this.currentOrder.userName;
         (<HTMLInputElement>document.getElementById('productItemList1')).value = JSON.stringify(this.currentOrder.productItemList); */
        this.orderFrm.get("orderId").setValue(this.currentOrder.orderId);
        this.orderFrm.get("userId").setValue(this.currentOrder.userId);
        this.orderFrm.get("userName").setValue(this.currentOrder.userName);
        this.orderFrm.get("productItemList").setValue(JSON.stringify(this.currentOrder.productItemList));
        this.modal.open();
    };
    OrderComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        this.msg2 = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._orderService.post(global_1.Global.BASE_ORDER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Order Successfully Placed.";
                        _this.msg2 = _this.currentOrder.orderId;
                        _this.LoadOrders();
                        _this.clearLS();
                        setTimeout(function () {
                            _this.router.navigateByUrl('/product');
                        }, 7000);
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
    OrderComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.orderFrm.enable() : this.orderFrm.disable();
    };
    return OrderComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], OrderComponent.prototype, "modal", void 0);
OrderComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/order.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, order_service_1.OrderService, router_1.Router])
], OrderComponent);
exports.OrderComponent = OrderComponent;
//# sourceMappingURL=order.component.js.map