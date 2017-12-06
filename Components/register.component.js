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
var forms_1 = require("@angular/forms");
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal");
var router_1 = require("@angular/router");
var enum_1 = require("../Shared/enum");
var global_1 = require("../Shared/global");
var RegisterComponent = (function () {
    function RegisterComponent(fb, _registerService, router) {
        this.fb = fb;
        this._registerService = _registerService;
        this.router = router;
        this.indLoading = false;
        this.searchTitle = "Search User";
        this.valid = false;
        this.clickMessage = '';
    }
    RegisterComponent.prototype.ngOnInit = function () {
        this.registerFrm = this.fb.group({
            Id: [''],
            Name: ['', forms_1.Validators.required],
            Role: [''],
            UserId: ['', forms_1.Validators.required],
            Password: [''],
            CompanyName: [''],
            SecurityAns: [''],
            Contact: [''],
            Address: ['']
        });
        this.LoadRegisters();
        var currentUser = JSON.parse(sessionStorage.getItem("currentUser")); //2
        if (currentUser == null) {
            this.clickMessage = 'You must login first';
            this.router.navigate(['/login']);
        }
        if (currentUser != null && (currentUser.Role == "superAdmin")) {
            this.valid = true;
        }
    };
    RegisterComponent.prototype.LoadRegisters = function () {
        var _this = this;
        this.indLoading = true;
        this._registerService.get(global_1.Global.BASE_REGISTER_ENDPOINT)
            .subscribe(function (registers) { _this.registers = registers; _this.indLoading = false; }, function (error) { return _this.msg = error; });
    };
    RegisterComponent.prototype.addRegister = function () {
        this.dbops = enum_1.DBOperation.create;
        this.SetControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.registerFrm.reset();
        this.modal.open();
    };
    RegisterComponent.prototype.editRegister = function (id) {
        this.dbops = enum_1.DBOperation.update;
        this.SetControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Update";
        this.register = this.registers.filter(function (x) { return x.Id == id; })[0];
        this.registerFrm.setValue(this.register);
        this.modal.open();
    };
    RegisterComponent.prototype.deleteRegister = function (id) {
        this.dbops = enum_1.DBOperation.delete;
        this.SetControlsState(false);
        this.modalTitle = "Confirm to Delete?";
        this.modalBtnTitle = "Delete";
        this.register = this.registers.filter(function (x) { return x.Id == id; })[0];
        this.registerFrm.setValue(this.register);
        this.modal.open();
    };
    RegisterComponent.prototype.logout = function () {
        sessionStorage.removeItem("currentUser");
        this.clickMessage = 'Logout Successfully!';
        this.router.navigate(['\login']);
    };
    RegisterComponent.prototype.onSubmit = function (formData) {
        var _this = this;
        this.msg = "";
        switch (this.dbops) {
            case enum_1.DBOperation.create:
                this._registerService.post(global_1.Global.BASE_REGISTER_ENDPOINT, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully added.";
                        _this.LoadRegisters();
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
                this._registerService.put(global_1.Global.BASE_REGISTER_ENDPOINT, formData._value.Id, formData._value).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully updated.";
                        _this.LoadRegisters();
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
                this._registerService.delete(global_1.Global.BASE_REGISTER_ENDPOINT, formData._value.Id).subscribe(function (data) {
                    if (data == 1) {
                        _this.msg = "Data successfully deleted.";
                        _this.LoadRegisters();
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
    RegisterComponent.prototype.SetControlsState = function (isEnable) {
        isEnable ? this.registerFrm.enable() : this.registerFrm.disable();
    };
    RegisterComponent.prototype.criteriaChange = function (value) {
        if (value != '[object Event]')
            this.listFilter = value;
    };
    return RegisterComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], RegisterComponent.prototype, "modal", void 0);
RegisterComponent = __decorate([
    core_1.Component({
        templateUrl: 'app/Components/register.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, register_service_1.RegisterService, router_1.Router])
], RegisterComponent);
exports.RegisterComponent = RegisterComponent;
//# sourceMappingURL=register.component.js.map