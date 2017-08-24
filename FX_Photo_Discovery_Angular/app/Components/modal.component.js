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
const core_1 = require("@angular/core");
const material_1 = require("@angular/material");
const forms_1 = require("@angular/forms"); //load reactive forms + validations
const material_2 = require("@angular/material"); //this allows data injection
const user_service_1 = require("../service/user.service");
const global_1 = require("../shared/global");
const optype_1 = require("../shared/optype");
let ModalComponent = class ModalComponent {
    constructor(formBuilder, userService, modalRef, data) {
        this.formBuilder = formBuilder;
        this.userService = userService;
        this.modalRef = modalRef;
        this.data = data;
    }
    ngOnInit() {
        this.userForm = this.formBuilder.group({
            Id: [''],
            Username: ['', forms_1.Validators.required],
            DisplayName: ['', forms_1.Validators.required],
            Gender: ['Male'],
            ProfileUrl: ['', forms_1.Validators.compose([forms_1.Validators.required, forms_1.Validators.pattern("(?:(?:http:\\/\\/)|(?:https:\\/\\/)){0,1}(?:www\\.){0,1}instagram\\.com\\/(?:.+)")])]
        });
        this.setControlsState(true);
        //this.userForm.reset();
    }
    setControlsState(enable) {
        //makes the controls read-only or editable
        enable ? this.userForm.enable() : this.userForm.disable();
    }
    onSubmit(formData) {
        switch (this.data.dpOpType) {
            case optype_1.DbOperation.Create:
                this.handleSubmitOnCreate(formData);
                break;
            case optype_1.DbOperation.Update:
                break;
            case optype_1.DbOperation.Delete:
                break;
        }
    }
    onClose(msg = "") {
        this.modalRef.close(msg);
    }
    handleSubmitOnCreate(formData) {
        this.userService.post(global_1.Global.BASE_USER_ENDPOINT, formData._value)
            .subscribe(data => {
            let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            this.onClose(msg);
        }, error => { this.onClose(error); });
    }
    handleSubmitOnUpdate(formData) {
        this.userService.put(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value)
            .subscribe(data => {
            let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            this.onClose(msg);
        }, error => { this.onClose(error); });
    }
    handleSubmitOnDelete(formData) {
        this.userService.delete(global_1.Global.BASE_USER_ENDPOINT, formData._value.Id)
            .subscribe(data => {
            let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
            this.onClose(msg);
        }, error => { this.onClose(error); });
    }
};
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