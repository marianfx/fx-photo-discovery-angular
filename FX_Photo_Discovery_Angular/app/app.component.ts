// the main application
import { Component } from '@angular/core';

@Component({
    selector: 'user-app', //this is css-selector by element-name; see the doc for classname or others; need to add in index.html to load this component there
    template: `
        <div>
            <nav class='navbar navbar-inverse'>
                <div class='container-fluid'>
                    <ul class='nav navbar-nav'>
                    <li><a [routerLink]="['home']">Home</a></li><!-- [routerlink] uses the router to get a link for the 'home' name (defined in app.routing) -->
                </ul>
                </div>
            </nav>    
        <div class='container'>
            <router-outlet></router-outlet><!-- here will be loaded the dynamic view Components. Can be declared with names. -->
        </div>
        </div>     
`
})

export class AppComponent {
    
}