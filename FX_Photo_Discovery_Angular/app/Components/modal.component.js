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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core");
var material_1 = require("@angular/material");
var forms_1 = require("@angular/forms"); //load reactive forms + validations
var material_2 = require("@angular/material"); //this allows data injection
var user_service_1 = require("../service/user.service");
var global_1 = require("../shared/global");
var optype_1 = require("../shared/optype");
var ModalComponent = (function () {
    function ModalComponent(formBuilder, userService, modalRef, data) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.modalRef = modalRef;
        this.data = data;
    }
    ModalComponent.prototype.ngOnInit = function () {
        this.userForm = this.formBuilder.group({
            Id: [''],
            Username: ['', forms_1.Validators.required],
            DisplayName: ['', forms_1.Validators.required],
            Gender: ['Male'],
            ProfileUrl: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("(?:(?:http:\\/\\/)|(?:https:\\/\\/)){0,1}(?:www\\.){0,1}instagram\\.com\\/(?:.+)")])]
        });
        this.setControlsState(true);
        //this.userForm.reset();
    };
    ModalComponent.prototype.setControlsState = function (enable) {
        //makes the controls read-only or editable
        enable ? this.userForm.enable() : this.userForm.disable();
    };
    ModalComponent.prototype.onSubmit = function (formData) {
        switch (this.data.dpOpType) {
            case optype_1.DbOperation.Create:
                this.handleSubmitOnCreate(formData);
                break;
            case optype_1.DbOperation.Update:
                break;
            case optype_1.DbOperation.Delete:
                break;
        }
    };
    ModalComponent.prototype.onClose = function (msg) {
        if (msg === void 0) { msg = ""; }
        this.modalRef.close(msg);
    };
    ModalComponent.prototype.handleSubmitOnCreate = function (formData) {
        var _this = this;
        this.userService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value)
            .subscribe(function (data) {
            var msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            _this.onClose(msg);
        }, function (error) { _this.onClose(error); });
    };
    ModalComponent.prototype.handleSubmitOnUpdate = function (formData) {
        var _this = this;
        this.userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value)
            .subscribe(function (data) {
            var msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            _this.onClose(msg);
        }, function (error) { _this.onClose(error); });
    };
    ModalComponent.prototype.handleSubmitOnDelete = function (formData) {
        var _this = this;
        this.userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id)
            .subscribe(function (data) {
            var msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            _this.onClose(msg);
        }, function (error) { _this.onClose(error); });
    };
    return ModalComponent;
}());
ModalComponent = __decorate([
    core_1.Component({
        //selector: 'modal-users',
        templateUrl: 'app/Components/modal.component.html' //remember - this needs to be the full path
    }),
    __param(3, core_1.Inject(material_2.MD_DIALOG_DATA)),
    __metadata("design:paramtypes", [forms_1.FormBuilder, user_service_1.UserService, material_1.MdDialogRef, Object])
], ModalComponent);
exports.ModalComponent = ModalComponent;
//# sourceMappingURL=modal.component.js.map