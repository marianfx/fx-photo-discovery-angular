import { Component, OnInit, Inject } from '@angular/core';
import { MdDialogRef } from '@angular/material';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//load reactive forms + validations
import { MD_DIALOG_DATA } from '@angular/material';//this allows data injection

import { IModalData } from "../models/modaldata";
import { UserService } from '../service/user.service';
import { Global } from '../shared/global';
import { DbOperation } from "../shared/optype";

@Component({
    //selector: 'modal-users',
    templateUrl: 'app/Components/modal.component.html'//remember - this needs to be the full path
})
export class ModalComponent implements OnInit {
    
    userForm: FormGroup;

    constructor(private formBuilder: FormBuilder, private userService: UserService, public modalRef: MdDialogRef<ModalComponent>, @Inject(MD_DIALOG_DATA) public data: IModalData) { }

    ngOnInit(): void {
        this.userForm = this.formBuilder.group({
            Id: [''],
            Username: ['', Validators.required],
            DisplayName: ['', Validators.required],
            Gender: ['Male'],
            ProfileUrl: ['', Validators.compose([Validators.required, Validators.pattern("(?:(?:http:\\/\\/)|(?:https:\\/\\/)){0,1}(?:www\\.){0,1}instagram\\.com\\/(?:.+)")])]
        });
        this.setControlsState(true);
        //this.userForm.reset();
    }
    
    setControlsState(enable: boolean): void {
        //makes the controls read-only or editable
        enable ? this.userForm.enable() : this.userForm.disable();
    }
    
    onSubmit(formData: any): void {
        switch (this.data.dpOpType) {
        case DbOperation.Create:
            this.handleSubmitOnCreate(formData);
            break;
        case DbOperation.Update:
            break;
        case DbOperation.Delete:
            break;
        }
    }

    onClose(msg: string = "") {
        this.modalRef.close(msg);
    }

    handleSubmitOnCreate(formData: any): void {
        this.userService.post(Global.BASE_USER_ENDPOINT, formData._value)
            .subscribe(data => {
                let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
                this.onClose(msg);
            },
            error => { this.onClose(error); });
    }

    handleSubmitOnUpdate(formData: any): void {
        this.userService.put(Global.BASE_USER_ENDPOINT, formData._value.Id, formData._value)
            .subscribe(data => {
                let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
                this.onClose(msg);
            },
            error => { this.onClose(error); });
    }

    handleSubmitOnDelete(formData: any): void {
        this.userService.delete(Global.BASE_USER_ENDPOINT, formData._value.Id)
            .subscribe(data => {
                let msg = data == 1 ? "Saved successfully." : "Cannot add new user; database error occured.";
                this.onClose(msg);
            },
            error => { this.onClose(error); });
    }
}
