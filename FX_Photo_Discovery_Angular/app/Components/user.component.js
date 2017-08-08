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
var core_1 = require("@angular/core"); //OnInit event + ViewChild to acces modal data
var forms_1 = require("@angular/forms"); //load reactive forms + validations
var ng2_bs3_modal_1 = require("ng2-bs3-modal/ng2-bs3-modal"); //modal for ng
var user_service_1 = require("../Service/user.service");
var global_1 = require("../Shared/global");
var optype_1 = require("../Shared/optype");
// will use the reactive forms style, with ts separated from html/css
var UserComponent = (function () {
    // FormBuilder and UserService injected with DI by ng (see Providers in app.)
    function UserComponent(formBuilder, userService) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.indLoading = false;
    }
    UserComponent.prototype.ngOnInit = function () {
        this.userForm = this.formBuilder.group({
            Id: [''],
            FirstName: ['', forms_1.Validators.required],
            LastName: [''],
            Gender: ['']
        });
        this.loadUsers();
    };
    UserComponent.prototype.loadUsers = function () {
        var _this = this;
        this.indLoading = true;
        this.userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(function (allUsers) {
            _this.users = allUsers;
            _this.indLoading = false;
        }, function (error) {
            _this.msg = error;
        });
    };
    UserComponent.prototype.setControlsState = function (enable) {
        //makes the controls read-only or editable
        enable ? this.userForm.enable() : this.userForm.disable();
    };
    UserComponent.prototype.addUser = function () {
        this.dbops = optype_1.DbOperation.Create;
        this.setControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userForm.reset();
        this.modal.open();
    };
    UserComponent.prototype.editUser = function (userid) {
        this.dbops = optype_1.DbOperation.Update;
        this.setControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Save";
        this.user = this.users.filter(function (u) { return u.Id == userid; })[0];
        this.userForm.setValue(this.user);
        this.modal.open();
    };
    UserComponent.prototype.deleteUser = function (userid) {
        this.dbops = optype_1.DbOperation.Delete;
        this.setControlsState(true);
        this.modalTitle = "Delete User";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(function (u) { return u.Id == userid; })[0];
        this.userForm.setValue(this.user);
        this.modal.open();
    };
    UserComponent.prototype.onSubmit = function (formData) {
        this.msg = "";
        switch (this.dbops) {
            case optype_1.DbOperation.Create:
                this.handleSubmitOnCreate(formData);
                break;
            case optype_1.DbOperation.Update:
                break;
            case optype_1.DbOperation.Delete:
                break;
        }
    };
    UserComponent.prototype.handleSubmitOnCreate = function (formData) {
        var _this = this;
        this.userService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value)
            .subscribe(function (data) {
            if (data == 1) {
                _this.msg = "Saved successfully.";
                _this.loadUsers();
            }
            else {
                _this.msg = "Cannot add new user; database error occured.";
            }
            _this.modal.dismiss();
        }, function (error) { _this.msg = error; });
    };
    UserComponent.prototype.handleSubmitOnUpdate = function (formData) {
        var _this = this;
        this.userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value)
            .subscribe(function (data) {
            if (data == 1) {
                _this.msg = "Saved successfully.";
                _this.loadUsers();
            }
            else {
                _this.msg = "Cannot add new user; database error occured.";
            }
            _this.modal.dismiss();
        }, function (error) { _this.msg = error; });
    };
    UserComponent.prototype.handleSubmitOnDelete = function (formData) {
        var _this = this;
        this.userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id)
            .subscribe(function (data) {
            if (data == 1) {
                _this.msg = "Saved successfully.";
                _this.loadUsers();
            }
            else {
                _this.msg = "Cannot add new user; database error occured.";
            }
            _this.modal.dismiss();
        }, function (error) { _this.msg = error; });
    };
    return UserComponent;
}());
__decorate([
    core_1.ViewChild('modal'),
    __metadata("design:type", ng2_bs3_modal_1.ModalComponent)
], UserComponent.prototype, "modal", void 0);
UserComponent = __decorate([
    core_1.Component({
        //selector: none - we do not specify a selector because we are not going to use it in any other component
        templateUrl: 'app/Components/user.component.html'
    }),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService])
], UserComponent);
exports.UserComponent = UserComponent;
//# sourceMappingURL=user.component.js.map