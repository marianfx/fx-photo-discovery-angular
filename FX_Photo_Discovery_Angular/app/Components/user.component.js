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
const core_1 = require("@angular/core"); //OnInit event + ViewChild to acces modal data
const material_1 = require("@angular/material"); //angular material modal
const cdk_1 = require("@angular/cdk");
const Observable_1 = require("rxjs/Observable");
const user_service_1 = require("../service/user.service");
const global_1 = require("../shared/global");
const optype_1 = require("../shared/optype");
const modal_component_1 = require("./modal.component");
const alert_component_1 = require("./Helpers/alert.component");
// will use the reactive forms style, with ts separated from html/css
let UserComponent = class UserComponent {
    // FormBuilder and UserService injected with DI by ng (see Providers in app.)
    constructor(userService, modal) {
        this.userService = userService;
        this.modal = modal;
        this.indLoading = false;
    }
    ngOnInit() {
        this.loadUsers();
    }
    loadUsers() {
        this.indLoading = true;
        this.userService.get(global_1.Global.BASE_USER_ENDPOINT)
            .subscribe(allUsers => {
            this.users = allUsers;
            this.dataSource = new TableDataSource(this.users);
            this.indLoading = false;
        }, error => {
            this.msg = error;
        });
    }
    addUserClick() {
        let dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: {},
                modalTitle: "Add New User",
                modalBtnTitle: "Add",
                dpOpType: optype_1.DbOperation.Create
            }
        });
        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }
    editUserClick(userid) {
        let dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: this.users.filter(u => u.Id == userid)[0],
                modalTitle: "Edit User",
                modalBtnTitle: "Save",
                dpOpType: optype_1.DbOperation.Update
            }
        });
        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }
    deleteUserClick(userid) {
        let dialogRef = this.modal.open(modal_component_1.ModalComponent, {
            height: '60%',
            width: '80%',
            data: {
                user: this.users.filter(u => u.Id == userid)[0],
                modalTitle: "Delete User",
                modalBtnTitle: "Delete",
                dpOpType: optype_1.DbOperation.Delete
            }
        });
        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }
};
__decorate([
    core_1.ViewChild('alertIfNoUsers'),
    __metadata("design:type", alert_component_1.AlertComponent)
], UserComponent.prototype, "usersAlert", void 0);
__decorate([
    core_1.ViewChild('alertIfMessage'),
    __metadata("design:type", alert_component_1.AlertComponent)
], UserComponent.prototype, "messageAlert", void 0);
UserComponent = __decorate([
    core_1.Component({
        //selector: none - we do not specify a selector because we are not going to use it in any other component
        templateUrl: 'app/Components/user.component.html'
    }),
    __metadata("design:paramtypes", [user_service_1.UserService, material_1.MdDialog])
], UserComponent);
exports.UserComponent = UserComponent;
class TableDataSource extends cdk_1.DataSource {
    constructor(userList) {
        super();
        this.userList = userList;
    }
    connect() {
        return Observable_1.Observable.create((observer) => {
            observer.next(this.userList);
            observer.complete();
        });
    }
    disconnect() { }
}
exports.TableDataSource = TableDataSource;
//# sourceMappingURL=user.component.js.map