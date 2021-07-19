import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ChangeCredentialsPageRoutingModule } from './change-credentials-routing.module';

import { ChangeCredentialsPage } from './change-credentials.page';
import {TranslateModule} from "@ngx-translate/core";

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        IonicModule,
        ChangeCredentialsPageRoutingModule,
        ReactiveFormsModule,
        TranslateModule
    ],
  declarations: [ChangeCredentialsPage]
})
export class ChangeCredentialsPageModule {}
