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
var core_1 = require("@angular/core"); //the needed Module class (declaration below)
var common_1 = require("@angular/common"); //commom things from core
var platform_browser_1 = require("@angular/platform-browser"); //browser ref
var forms_1 = require("@angular/forms"); //for the user part (forms, not template-drive, but reactive - based on model)
var http_1 = require("@angular/http"); //htp stuff
//import routing
var app_routing_1 = require("./app.routing");
//import declared components
var app_component_1 = require("./app.component");
var home_component_1 = require("./components/home.component");
//import services
var user_service_1 = require("./service/user.service");
// here we declare module metadatas
var AppModule = (function () {
    // here the actual module is exported
    function AppModule() {
    }
    return AppModule;
}());
AppModule = __decorate([
    core_1.NgModule({
        imports: [platform_browser_1.BrowserModule, forms_1.ReactiveFormsModule, http_1.HttpModule, app_routing_1.routing],
        declarations: [app_component_1.AppComponent, home_component_1.HomeComponent],
        providers: [{ provide: common_1.APP_BASE_HREF, useValue: '/' }, user_service_1.UserService],
        bootstrap: [app_component_1.AppComponent] //the ENTRY (start) COMPONENT
    })
    // here the actual module is exported
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map