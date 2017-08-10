import { Component, OnInit } from '@angular/core';//OnInit event + ViewChild to acces modal data
import { MdDialog, MdDialogRef } from '@angular/material';//angular material modal
import { DataSource } from '@angular/cdk';
import { Observable } from 'rxjs/Observable';
import { Subscriber } from 'rxjs';

import { UserService } from '../service/user.service';
import { IUser } from '../models/user';
import { Global } from '../shared/global';
import { DbOperation } from "../shared/optype";
import { ModalComponent } from './modal.component';

// will use the reactive forms style, with ts separated from html/css
@Component({
    //selector: none - we do not specify a selector because we are not going to use it in any other component
    templateUrl: 'app/Components/user.component.html'
})
export class UserComponent implements OnInit {//on init will do stuff
    
    users: IUser[];//keeps list of users
    msg: string;
    indLoading: boolean = false;
    dataSource: TableDataSource;

    // FormBuilder and UserService injected with DI by ng (see Providers in app.)
    constructor(private userService: UserService, public modal: MdDialog) { }

    ngOnInit(): void {
        this.loadUsers();
    }

    loadUsers(): void {
        this.indLoading = true;
        this.userService.get(Global.BASE_USER_ENDPOINT)
            .subscribe(allUsers => {
                    this.users = allUsers;
                    this.dataSource = new TableDataSource(this.users);
                    this.indLoading = false;
                },
                error => {
                    this.msg = error;
                });
    }

    addUserClick(): void {
        let dialogRef = this.modal.open(ModalComponent,
            {
                height: '60%',
                width: '80%',
                data: {
                    user: {},
                    modalTitle: "Add New User",
                    modalBtnTitle: "Add",
                    dpOpType: DbOperation.Create
                }
            });

        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }

    editUserClick(userid: number): void {
        let dialogRef = this.modal.open(ModalComponent,
            {
                height: '60%',
                width: '80%',
                data: {
                    user: this.users.filter(u => u.Id == userid)[0],
                    modalTitle: "Edit User",
                    modalBtnTitle: "Save",
                    dpOpType: DbOperation.Update
                }
            });
        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }

    deleteUserClick(userid: number): void {
        let dialogRef = this.modal.open(ModalComponent,
            {
                height: '60%',
                width: '80%',
                data: {
                    user: this.users.filter(u => u.Id == userid)[0],
                    modalTitle: "Delete User",
                    modalBtnTitle: "Delete",
                    dpOpType: DbOperation.Delete
                }
            });
        dialogRef.afterClosed().subscribe(msg => {
            this.loadUsers();
            this.msg = msg;
        });
    }
}

export class TableDataSource extends DataSource<any> {
    constructor(private userList: IUser[]) {
        super();
    }

    connect(): Observable<any> {
        return Observable.create((observer: Subscriber<any>) => {
            observer.next(this.userList);
            observer.complete();
        });
    }

    disconnect(): void { }
}