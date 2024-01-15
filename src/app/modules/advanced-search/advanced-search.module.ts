import { ZorroNgModule } from '../../ng-zorro/zorro-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdvancedSearchComponent } from './views/advanced-search.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { AdvancedSearchRoutingModule } from './advanced-search-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ZorroNgModule,
    TranslocoRootModule,
    AdvancedSearchRoutingModule,
  ],
  declarations: [AdvancedSearchComponent],
})
export class AdvancedSearchModule {}
