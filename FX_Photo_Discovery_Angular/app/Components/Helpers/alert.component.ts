import { Component } from '@angular/core';
import { Colors } from '../../Shared/colors';

@Component({
    selector: "alert",
    templateUrl: 'app/Components/Helpers/alert.component.html'
})
export class AlertComponent{
    message: String = "";
    isVisible: boolean = false;
    color: Colors = Colors.Red;
    canBeClosed: boolean = true;
    
    constructor() {
    }
}