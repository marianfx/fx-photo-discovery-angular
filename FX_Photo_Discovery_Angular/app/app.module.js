"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
//this is the Root Module, Angular Module that is bootstrapped at start and loads the needed components, services etc.
//Modules usually are bootstrappers and can be loaded in other modules / ts files
const core_1 = require("@angular/core"); //the needed Module class (declaration below)
const common_1 = require("@angular/common"); //commom things from core
const platform_browser_1 = require("@angular/platform-browser"); //browser ref
const forms_1 = require("@angular/forms"); //for the user part (forms, not template-drive, but reactive - based on model)
const http_1 = require("@angular/http"); //htp stuff
const animations_1 = require("@angular/platform-browser/animations");
//import routing
const app_routing_1 = require("./app.routing");
//import material wrapper
const material_module_1 = require("./material.module");
//import declared components
const app_component_1 = require("./app.component");
const home_component_1 = require("./components/home.component");
const user_component_1 = require("./components/user.component");
const modal_component_1 = require("./components/modal.component");
const alert_component_1 = require("./Components/Helpers/alert.component");
//import services
const user_service_1 = require("./service/user.service");
// here we declare module metadatas
let AppModule = 
// here the actual module is exported
class AppModule {
};
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, animations_1.BrowserAnimationsModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing, material_module_1.MaterialModule],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent, user_component_1.UserComponent, modal_component_1.ModalComponent, alert_component_1.AlertComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, user_service_1.UserService],
        entryComponents: [modal_component_1.ModalComponent],
        bootstrap: [app_component_1.AppComponent] //the ENTRY (start) COMPONENT
    })
    // here the actual module is exported
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map