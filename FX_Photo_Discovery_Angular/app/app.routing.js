"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var router_1 = require("@angular/router"); //load the router
var home_component_1 = require("./components/home.component"); //load the home component
var appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent } //home
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map