//this is the Root Module, Angular Module that is bootstrapped at start and loads the needed components, services etc.
//Modules usually are bootstrappers and can be loaded in other modules / ts files
import { NgModule } from '@angular/core';//the needed Module class (declaration below)
import { APP_BASE_HREF } from '@angular/common';//commom things from core
import { BrowserModule } from '@angular/platform-browser';//browser ref
import { ReactiveFormsModule } from '@angular/forms';//for the user part (forms, not template-drive, but reactive - based on model)
import { HttpModule } from '@angular/http';//htp stuff

//import routing
import { routing } from './app.routing';

//import declared components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';

//import services
import { UserService } from './service/user.service';


// here we declare module metadatas
@NgModule({
    imports: [BrowserModule, ReactiveFormsModule, HttpModule, routing],//what MODULES this module loads
    declarations: [AppComponent, HomeComponent],//what COMPONENTS this module has
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService],//what SERVICES will be used (http operations here, using href)
    bootstrap: [AppComponent]//the ENTRY (start) COMPONENT
})

// here the actual module is exported
export class AppModule { }