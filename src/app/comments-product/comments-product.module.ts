import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { CommentsProductPageRoutingModule } from './comments-product-routing.module';

import { CommentsProductPage } from './comments-product.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    CommentsProductPageRoutingModule
  ],
  declarations: [CommentsProductPage]
})
export class CommentsProductPageModule {}
