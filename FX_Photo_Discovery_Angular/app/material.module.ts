
import { NgModule } from '@angular/core';//the needed Module class (declaration below)

import { MdDialogModule, MdToolbarModule, MdButtonModule, MdIconModule, MdCardModule, MdTableModule } from '@angular/material';
import { CdkTableModule } from '@angular/cdk';

// here we declare module metadatas
@NgModule({
    exports: [MdDialogModule, MdToolbarModule, MdButtonModule, MdIconModule, MdCardModule, CdkTableModule, MdTableModule]
})

// here the actual module is exported
export class MaterialModule { }