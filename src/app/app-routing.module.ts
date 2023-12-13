import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'inicio',
    loadChildren: () => import('./inicio/inicio.module').then( m => m.InicioPageModule)
  },
  {
    path: 'registrate',
    loadChildren: () => import('./registrate/registrate.module').then( m => m.RegistratePageModule)
  },
  {
    path: 'iniciar-sesion',
    loadChildren: () => import('./iniciar-sesion/iniciar-sesion.module').then( m => m.IniciarSesionPageModule)
  },
  {
    path: 'productos',
    loadChildren: () => import('./productos/productos.module').then( m => m.ProductosPageModule)
  },
  {
    path: 'cerrar-sesion',
    loadChildren: () => import('./cerrar-sesion/cerrar-sesion.module').then( m => m.CerrarSesionPageModule)
  },
  {
    path: 'add-product',
    loadChildren: () => import('./add-product/add-product.module').then( m => m.AddProductPageModule)
  },
  {
    path: 'aproved-product',
    loadChildren: () => import('./aproved-product/aproved-product.module').then( m => m.AprovedProductPageModule)
  },  {
    path: 'comments-product',
    loadChildren: () => import('./comments-product/comments-product.module').then( m => m.CommentsProductPageModule)
  },
  {
    path: 'details-product',
    loadChildren: () => import('./details-product/details-product.module').then( m => m.DetailsProductPageModule)
  },

  
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
