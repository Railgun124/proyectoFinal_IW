import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { AprovedProductPage } from './aproved-product.page';

const routes: Routes = [
  {
    path: '',
    component: AprovedProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AprovedProductPageRoutingModule {}
