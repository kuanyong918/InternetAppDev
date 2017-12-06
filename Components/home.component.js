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
var register_service_1 = require("../Service/register.service");
var global_1 = require("../Shared/global");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var router_1 = require("@angular/router");
var forms_1 = require("@angular/forms");
var enum_1 = require("../Shared/enum");
var HomeComponent = (function () {
    function HomeComponent(fb, _registerService, router) {
        this.fb = fb;
        this._registerService = _registerService;
        this.router = router;
        this.clickMessage = '';
        this.indLoading = false;
    }
    HomeComponent.prototype.ngOnInit = function () {
        //this.LoadRegister();
        this.registerFrm = this.fb.group({
            Id: [''],
            Name: [''],
            Role: [''],
            CompanyName: [''],
            UserId: [''],
            Password: [''],
            SecurityAns: [''],
            Contact: [''],
            Address: ['']
        });
        this.LoadRegister();
    };
    HomeComponent.prototype.forgotPassword = function () {
        this.router.navigate(['/forgotPassword']);
    };
    HomeComponent.prototype.LoadRegister = function () {
        var _this = this;
        this.indLoading = true;
        this._registerService.get(global_1.Global.BASE_REGISTER_ENDPOINT)
            .subscribe(function (registers) { _this.registers = registers; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    //logout()
    //{
    //     sessionStorage.removeItem("currentUser");
    //    this.clickMessage = 'Logout Successfully!';
    //}
    HomeComponent.prototype.login = function (username, password) {
        var userNameIsFound = false;
        var passwordDoesNotMatch = false;
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser")); //2
        if (currentUser != null && currentUser.UserId == username) {
            this.clickMessage = 'Youve Already Logged In!';
            return;
        }
        for (var i = 0; i < this.registers.length; i++) {
            if (this.registers[i].UserId == username) {
                userNameIsFound = true;
                if (password == this.registers[i].Password) {
                    this.clickMessage = 'Login successfully!';
                    this.router.navigate(['/user']);
                    sessionStorage.setItem("currentUser", JSON.stringify(this.registers[i])); //1
                    return;
                }
                else {
                    passwordDoesNotMatch = true;
                }
            }
        }
        this.clickMessage = 'Login failed!';
        if (userNameIsFound)
            this.clickMessage = this.clickMessage + "Due to not matching password";
        else
            this.clickMessage = this.clickMessage + "User is not found";
    };
    //LoadUsers(): void {
    //    this.indLoading = true;
    //    this._userService.get(Global.BASE_USER_ENDPOINT)
    //        .subscribe(users => { this.users = users; this.indLoading = false; }
    //        //, error => this.msg = <any>error
    //        );
    //}
    HomeComponent.prototype.addRegister = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.registerFrm.reset();
        this.modal.open();
    };
    HomeComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._registerService.post(global_1.Global.BASE_REGISTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadRegister();
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
    HomeComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.registerFrm.enable() : this.registerFrm.disable();
    };
    return HomeComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], HomeComponent.prototype, "modal", void 0);
HomeComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/home.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, register_service_1.RegisterService, router_1.Router])
], HomeComponent);
exports.HomeComponent = HomeComponent;
//# sourceMappingURL=home.component.js.map