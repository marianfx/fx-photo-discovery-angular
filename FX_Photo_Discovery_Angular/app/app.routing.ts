import { ModuleWithProviders } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';//load the router

import { HomeComponent } from './components/home.component';//load the home component

const appRoutes: Routes = [
    { path: '', redirectTo: 'home', pathMatch: 'full' },//redirect / to home
    { path: 'home', component: HomeComponent }//home
];

export const routing: ModuleWithProviders = // that two dots = TYPE specification
    RouterModule.forRoot(appRoutes);