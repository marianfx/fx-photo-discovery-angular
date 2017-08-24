"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const platform_browser_dynamic_1 = require("@angular/platform-browser-dynamic"); //@angular (no point) = import from modules
const app_module_1 = require("./app.module"); //this imports our class (do not use .ts extension)
platform_browser_dynamic_1.platformBrowserDynamic().bootstrapModule(app_module_1.AppModule); //starts the module, injects all the services, does everything etc
//# sourceMappingURL=main.js.map