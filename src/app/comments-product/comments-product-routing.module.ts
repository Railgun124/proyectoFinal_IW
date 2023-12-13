import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { CommentsProductPage } from './comments-product.page';

const routes: Routes = [
  {
    path: '',
    component: CommentsProductPage
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CommentsProductPageRoutingModule {}
