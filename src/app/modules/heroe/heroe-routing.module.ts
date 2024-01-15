import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HeroeComponent } from './views/heroe/heroe.component';

const routes: Routes = [
  // As home-routing.module case's, we just have one route in this module so path can be ''
  {
    path: '',
    pathMatch: 'full',
    component: HeroeComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class HeroeRoutingModule {}
