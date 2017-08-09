//this is the Root Module, Angular Module that is bootstrapped at start and loads the needed components, services etc.
//Modules usually are bootstrappers and can be loaded in other modules / ts files
import { NgModule } from '@angular/core';//the needed Module class (declaration below)
import { APP_BASE_HREF } from '@angular/common';//commom things from core
import { BrowserModule } from '@angular/platform-browser';//browser ref
import { ReactiveFormsModule } from '@angular/forms';//for the user part (forms, not template-drive, but reactive - based on model)
import { HttpModule } from '@angular/http';//htp stuff
import { MdDialogModule, MdToolbarModule, MdButtonModule, MdIconModule, MdCardModule, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

//import routing
import { routing } from './app.routing';

//import declared components
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home.component';
import { UserComponent } from './components/user.component';
import { ModalComponent } from './components/modal.component';

//import services
import { UserService } from './service/user.service';


// here we declare module metadatas
@NgModule({
    imports: [BrowserModule, BrowserAnimationsModule, ReactiveFormsModule, HttpModule, routing, MdDialogModule, MdToolbarModule, MdButtonModule, MdIconModule, MdCardModule, CdkTableModule, MdTableModule],//what MODULES this module loads. Also loads the animations globally.
    declarations: [AppComponent, HomeComponent, UserComponent, ModalComponent],//what COMPONENTS this module has (this is the root module, so handles them all; will know to inject them.)
    providers: [{ provide: APP_BASE_HREF, useValue: '/' }, UserService],//what SERVICES will be used
    entryComponents: [ModalComponent],
    bootstrap: [AppComponent]//the ENTRY (start) COMPONENT
})

// here the actual module is exported
export class AppModule { }