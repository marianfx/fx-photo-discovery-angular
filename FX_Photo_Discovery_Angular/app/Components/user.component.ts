import { Component, OnInit, ViewChild } from '@angular/core';//OnInit event + ViewChild to acces modal data
import { FormBuilder, FormGroup, Validators } from '@angular/forms';//load reactive forms + validations
import { Observable } from 'rxjs/Rx';//will use subscribe (to events) and filter
import { ModalComponent } from 'ng2-bs3-modal/ng2-bs3-modal';

import { UserService } from '../Service/user.service';
import { IUser } from '../Models/user';
import { Global } from '../Shared/global';
import Optype = require("../Shared/optype");

// will use the reactive forms style, with ts separated from html/css
@Component({
    //selector: none - we do not specify a selector because we are not going to use it in any other component
    templateUrl: 'app/Components/user.component.html'
})

export class UserComponent implements OnInit {

    @ViewChild('modal') modal: ModalComponent;//gets the modal object using css-selector
    users: IUser[];
    user: IUser;
    msg: string;
    indLoading: boolean = false;
    userForm: FormGroup;
    dbops: any;
    modalTitle: string;
    modalBtnTitle: string;

    constructor(private fb: FormBuilder, private _userService: UserService) { }

    ngOnInit(): void {

        this.userForm = this.fb.group({
            Id: [''],
            FirstName: ['', Validators.required],
            LastName: [''],
            Gender: ['']
        });

        this.LoadUsers();

    }

    LoadUsers(): void {
        this.indLoading = true;
        //this._userService.get(Global.BASE_USER_ENDPOINT)
        //    .subscribe(users => { this.users = users; this.indLoading = false; },
        //        error => this.msg = <any>error);

    }
}