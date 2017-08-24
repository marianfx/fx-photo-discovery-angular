"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const router_1 = require("@angular/router"); //load the router
const home_component_1 = require("./components/home.component"); //load the home component
const user_component_1 = require("./components/user.component");
const appRoutes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home', component: home_component_1.HomeComponent },
    { path: 'user', component: user_component_1.UserComponent }
];
exports.routing = router_1.RouterModule.forRoot(appRoutes);
//# sourceMappingURL=app.routing.js.map