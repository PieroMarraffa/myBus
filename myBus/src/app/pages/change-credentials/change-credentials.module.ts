import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCredentialsPageRoutingModule } from './change-credentials-routing.module';

import { ChangeCredentialsPage } from './change-credentials.page';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChangeCredentialsPageRoutingModule,
        ReactiveFormsModule
    ],
  declarations: [ChangeCredentialsPage]
})
export class ChangeCredentialsPageModule {}
