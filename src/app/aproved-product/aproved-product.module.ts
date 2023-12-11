import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AprovedProductPageRoutingModule } from './aproved-product-routing.module';

import { AprovedProductPage } from './aproved-product.page';


@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AprovedProductPageRoutingModule,
  ],
  declarations: [AprovedProductPage]
})
export class AprovedProductPageModule {}
