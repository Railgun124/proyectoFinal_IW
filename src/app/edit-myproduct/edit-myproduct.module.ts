import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule,ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { EditMyproductPageRoutingModule } from './edit-myproduct-routing.module';

import { EditMyproductPage } from './edit-myproduct.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    EditMyproductPageRoutingModule,
    ReactiveFormsModule
  ],
  declarations: [EditMyproductPage]
})
export class EditMyproductPageModule {}
