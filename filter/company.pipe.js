"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var CompanyFilterPipe = (function () {
    function CompanyFilterPipe() {
    }
    CompanyFilterPipe.prototype.transform = function (value, filter) {
        filter = filter ? filter.toLocaleLowerCase() : null;
        return filter ? value.filter(function (app) {
            return app.Name != null && app.Name.toLocaleLowerCase().indexOf(filter) != -1
                || app.Email != null && app.Email.toLocaleLowerCase().indexOf(filter) != -1
                || app.Phone != null && app.Phone.toLocaleLowerCase().indexOf(filter) != -1
                || app.Owner != null && app.Owner.toLocaleLowerCase().indexOf(filter) != -1
                || app.Street != null && app.Street.toLocaleLowerCase().indexOf(filter) != -1
                || app.City != null && app.City.toLocaleLowerCase().indexOf(filter) != -1
                || app.State != null && app.State.toLocaleLowerCase().indexOf(filter) != -1
                || app.Country != null && app.Country.toLocaleLowerCase().indexOf(filter) != -1
                || app.DUNS != null && app.DUNS.toLocaleLowerCase().indexOf(filter) != -1
                || app.Type != null && app.Type.toLocaleLowerCase().indexOf(filter) != -1;
        }) : value;
    };
    return CompanyFilterPipe;
}());
CompanyFilterPipe = __decorate([
    core_1.Pipe({
        name: 'companyFilter'
    })
], CompanyFilterPipe);
exports.CompanyFilterPipe = CompanyFilterPipe;
//# sourceMappingURL=company.pipe.js.map