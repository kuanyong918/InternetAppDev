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
var ForgotPasswordComponent = (function () {
    function ForgotPasswordComponent(fb, _registerService, router) {
        this.fb = fb;
        this._registerService = _registerService;
        this.router = router;
        this.clickMessage = '';
        this.indLoading = false;
    }
    ForgotPasswordComponent.prototype.ngOnInit = function () {
        this.forgotPasswordFrm = this.fb.group({
            Id: [''],
            UserId: [''],
            SecurityAns: [''],
            Address: [''],
            Password: ['']
        });
        this.LoadRegister();
    };
    ForgotPasswordComponent.prototype.LoadRegister = function () {
        var _this = this;
        this.indLoading = true;
        this._registerService.get(global_1.Global.BASE_REGISTER_ENDPOINT)
            .subscribe(function (registers) { _this.registers = registers; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    ForgotPasswordComponent.prototype.SaveRegister = function () {
        //save this.register
        this._registerService.post(global_1.Global.BASE_REGISTER_ENDPOINT, this.register.Password)
            .map(function (res) { return res.json(); });
    };
    //submit(username: string, securityAns: string) {
    //    for (var i = 0; i < this.registers.length; i++) {
    //        if (this.registers[i].UserId == username) {
    //            if (this.registers[i].SecurityAns == securityAns) {
    //                this.clickMessage = 'Login successfully!';
    //                this.router.navigate(['/home']);
    //                return;
    //            }
    //        }
    //    }
    //}
    ForgotPasswordComponent.prototype.submit = function (username, securityAns) {
        var userNameFound = false;
        var answerNotMatch = false;
        for (var i = 0; i < this.registers.length; i++) {
            if (this.registers[i].UserId == username) {
                userNameFound = true;
                if (securityAns == this.registers[i].SecurityAns) {
                    this.clickMessage = '';
                    this.modal.open();
                    //  this.updatePassword(this.registers[i]);
                    localStorage.setItem("forgetPWDUser", JSON.stringify(this.registers[i]));
                    return;
                }
                else {
                    answerNotMatch = true;
                }
            }
        }
        this.clickMessage = 'Verification failed!';
        if (userNameFound)
            this.clickMessage = this.clickMessage + "Due to not matching password";
        else
            this.clickMessage = this.clickMessage + "User is not found";
    };
    //resetPassword() {
    //    this.dbops = DBOperation.update;
    //    this.SetControlsState(true);
    //    this.register = this.registers.filter(x => x.Id == id)[0];
    //    this.registerFrm.setValue(this.register);
    //    this.modal.open();
    //}
    ForgotPasswordComponent.prototype.updatePassword = function (newPassword) {
        //this.SaveRegister();
        //this.modal.dismiss();
        //this.router.navigate(['/user']);
    };
    ForgotPasswordComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.register = JSON.parse(localStorage.getItem("forgetPWDUser"));
        this.register.Password = formData._value.Password;
        switch (this.dbops) {
            case enum_1.DBOperation.update:
                this._registerService.post(global_1.Global.BASE_REGISTER_ENDPOINT, this.register).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Password successfully updated.";
                        _this.LoadRegister();
                        _this.modal.dismiss();
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
    ForgotPasswordComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.forgotPasswordFrm.enable() : this.forgotPasswordFrm.disable();
    };
    return ForgotPasswordComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], ForgotPasswordComponent.prototype, "modal", void 0);
ForgotPasswordComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/forgotPassword.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, register_service_1.RegisterService, router_1.Router])
], ForgotPasswordComponent);
exports.ForgotPasswordComponent = ForgotPasswordComponent;
//# sourceMappingURL=forgotPassword.component.js.map