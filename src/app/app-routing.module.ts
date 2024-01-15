import { NavbarPage } from './modules/layout/views/navbar/navbar.page';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ROUTES } from './app.routes';

const routes: Routes = [
  {
    path: '',
    component: NavbarPage,
    children: [
      {
        path: ROUTES.HOME,
        loadChildren: () =>
          import('./modules/home/home.module').then((m) => m.HomeModule),
      },
      {
        path: ROUTES.HEROES,
        loadChildren: () =>
          import('./modules/heroe/heroe.module').then((m) => m.HeroeModule),
      },
      {
        path: ROUTES.ADVANCED_SEARCH,
        loadChildren: () =>
          import('./modules/advanced-search/advanced-search.module').then(
            (m) => m.AdvancedSearchModule
          ),
      },
    ],
  },
  { path: '**', component: NavbarPage },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
