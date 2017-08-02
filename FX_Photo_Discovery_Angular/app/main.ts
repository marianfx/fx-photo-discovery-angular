import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';//@angular (no point) = import from modules
import { AppModule } from './app.module';//this imports our class (do not use .ts extension)

platformBrowserDynamic().bootstrapModule(AppModule);//starts the module, injects all the services, does everything etc