import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';//load the router

import { HomeComponent } from './components/home.component';//load the home component
import { UserComponent } from './components/user.component';

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },//redirect / to home
    { path: 'home', component: HomeComponent },//home
    { path :'user', component: UserComponent }
];

export const routing: ModuleWithProviders = // that two dots = TYPE specification
    RouterModule.forRoot(appRoutes);