import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdvancedSearchComponent } from './views/advanced-search.component';

const routes: Routes = [
  // As home & heroes-routing.module case's, we just have one route in this module so path can be ''
  {
    path: '',
    pathMatch: 'full',
    component: AdvancedSearchComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdvancedSearchRoutingModule {}
