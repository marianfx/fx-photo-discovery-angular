import { Component, OnInit, ViewChild } from '@angular/core';//OnInit event + ViewChild to acces modal data
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//load reactive forms + validations
import { Observable } from 'rxjs/Rx';//will use subscribe (to events) and filter
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';//modal for ng

import { UserService } from '../Service/user.service';
import { IUser } from '../Models/user';
import { Global } from '../Shared/global';
import { DbOperation } from "../Shared/optype";

// will use the reactive forms style, with ts separated from html/css
@Component({
    //selector: none - we do not specify a selector because we are not going to use it in any other component
    templateUrl: 'app/Components/user.component.html'
})

export class UserComponent implements OnInit {//on init will do stuff

    @ViewChild('modal') modal: ModalComponent;//gets the modal object using css-selector (not quite css, cause it's right in the tag <modal #modal>)
    users: IUser[];//keeps list of users
    user: IUser;//keeps the user for add/edit/delete
    msg: string;
    indLoading: boolean = false;
    userForm: FormGroup;
    dbops: DbOperation;
    modalTitle: string;
    modalBtnTitle: string;

    // FormBuilder and UserService injected with DI by ng (see Providers in app.)
    constructor(private formBuilder: FormBuilder, private userService: UserService) { }

    ngOnInit(): void {

        this.userForm = this.formBuilder.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: [''],
            Gender: ['']
        });

        this.loadUsers();
    }

    loadUsers(): void {
        this.indLoading = true;
        this.userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(allUsers => {
                    this.users = allUsers;
                    this.indLoading = false;
                },
                error => {
                    this.msg = error;
                });
    }

    setControlsState(enable: boolean): void {
        //makes the controls read-only or editable
        enable ? this.userForm.enable() : this.userForm.disable();
    }

    addUser(): void {
        this.dbops = DbOperation.Create;
        this.setControlsState(true);
        this.modalTitle = "Add New User";
        this.modalBtnTitle = "Add";
        this.userForm.reset();
        this.modal.open();
    }

    editUser(userid: number): void {
        this.dbops = DbOperation.Update;
        this.setControlsState(true);
        this.modalTitle = "Edit User";
        this.modalBtnTitle = "Save";
        this.user = this.users.filter(u => u.Id == userid)[0];
        this.userForm.setValue(this.user);
        this.modal.open();
    }

    deleteUser(userid: number): void {
        this.dbops = DbOperation.Delete;
        this.setControlsState(true);
        this.modalTitle = "Delete User";
        this.modalBtnTitle = "Delete";
        this.user = this.users.filter(u => u.Id == userid)[0];
        this.userForm.setValue(this.user);
        this.modal.open();
    }

    onSubmit(formData: any): void {
        this.msg = "";

        switch(this.dbops) {
            case DbOperation.Create:
                this.handleSubmitOnCreate(formData);
                break;
            case DbOperation.Update:
                break;
            case DbOperation.Delete:
                break;
        }
    }

    handleSubmitOnCreate(formData: any): void {
        this.userService.post(Global.BASE_USER_ENDPOINT, formData._value)
            .subscribe(data => {
                    if (data == 1) {
                        this.msg = "Saved successfully.";
                        this.loadUsers();
                    } else {
                        this.msg = "Cannot add new user; database error occured.";
                    }

                    this.modal.dismiss();
                },
                error => {this.msg = error});
    }

    handleSubmitOnUpdate(formData: any): void {
        this.userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value)
            .subscribe(data => {
                    if (data == 1) {
                        this.msg = "Saved successfully.";
                        this.loadUsers();
                    } else {
                        this.msg = "Cannot add new user; database error occured.";
                    }

                    this.modal.dismiss();
                },
                error => { this.msg = error });
    }

    handleSubmitOnDelete(formData: any): void {
        this.userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id)
            .subscribe(data => {
                    if (data == 1) {
                        this.msg = "Saved successfully.";
                        this.loadUsers();
                    } else {
                        this.msg = "Cannot add new user; database error occured.";
                    }

                    this.modal.dismiss();
                },
                error => { this.msg = error });
    }
}