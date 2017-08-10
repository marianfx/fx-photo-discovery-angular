"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
var core_1 = require("@angular/core"); //the needed Module class (declaration below)
var material_1 = require("@angular/material");
var cdk_1 = require("@angular/cdk");
// here we declare module metadatas
var MaterialModule = (function () {
    // here the actual module is exported
    function MaterialModule() {
    }
    return MaterialModule;
}());
MaterialModule = __decorate([
    core_1.NgModule({
        exports: [material_1.MdDialogModule, material_1.MdToolbarModule, material_1.MdButtonModule, material_1.MdIconModule, material_1.MdCardModule, cdk_1.CdkTableModule, material_1.MdTableModule]
    })
    // here the actual module is exported
], MaterialModule);
exports.MaterialModule = MaterialModule;
//# sourceMappingURL=material.module.js.map