"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = Object.setPrototypeOf ||
        ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
        function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
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
var core_1 = require("@angular/core"); //OnInit event + ViewChild to acces modal data
var material_1 = require("@angular/material"); //angular material modal
var cdk_1 = require("@angular/cdk");
var Observable_1 = require("rxjs/Observable");
var user_service_1 = require("../service/user.service");
var global_1 = require("../shared/global");
var optype_1 = require("../shared/optype");
var modal_component_1 = require("./modal.component");
// will use the reactive forms style, with ts separated from html/css
var UserComponent = (function () {
    // FormBuilder and UserService injected with DI by ng (see Providers in app.)
    function UserComponent(userService, modal) {
        this.userService = userService;
        this.modal = modal;
        this.indLoading = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.loadUsers();
    };
    UserComponent.prototype.loadUsers = function () {
        var _this = this;
        this.indLoading = true;
        this.userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (allUsers) {
            _this.users = allUsers;
            _this.dataSource = new TableDataSource(_this.users);
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    UserComponent.prototype.addUserClick = function () {
        var _this = this;
        var dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: {},
                modalTitle: "Add New User",
                modalBtnTitle: "Add",
                dpOpType: optype_1.DbOperation.Create
            }
        });
        dialogRef.afterClosed().subscribe(function (msg) {
            _this.loadUsers();
            _this.msg = msg;
        });
    };
    UserComponent.prototype.editUserClick = function (userid) {
        var _this = this;
        var dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: this.users.filter(function (u) { return u.Id == userid; })[0],
                modalTitle: "Edit User",
                modalBtnTitle: "Save",
                dpOpType: optype_1.DbOperation.Update
            }
        });
        dialogRef.afterClosed().subscribe(function (msg) {
            _this.loadUsers();
            _this.msg = msg;
        });
    };
    UserComponent.prototype.deleteUserClick = function (userid) {
        var _this = this;
        var dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: this.users.filter(function (u) { return u.Id == userid; })[0],
                modalTitle: "Delete User",
                modalBtnTitle: "Delete",
                dpOpType: optype_1.DbOperation.Delete
            }
        });
        dialogRef.afterClosed().subscribe(function (msg) {
            _this.loadUsers();
            _this.msg = msg;
        });
    };
    return UserComponent;
}());
UserComponent = __decorate([
    core_1.Component({
        //selector: none - we do not specify a selector because we are not going to use it in any other component
        templateUrl: 'app/Components/user.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, material_1.MdDialog])
], UserComponent);
exports.UserComponent = UserComponent;
var TableDataSource = (function (_super) {
    __extends(TableDataSource, _super);
    function TableDataSource(userList) {
        var _this = _super.call(this) || this;
        _this.userList = userList;
        return _this;
    }
    TableDataSource.prototype.connect = function () {
        var _this = this;
        return Observable_1.Observable.create(function (observer) {
            observer.next(_this.userList);
            observer.complete();
        });
    };
    TableDataSource.prototype.disconnect = function () { };
    return TableDataSource;
}(cdk_1.DataSource));
exports.TableDataSource = TableDataSource;
//# sourceMappingURL=user.component.js.map