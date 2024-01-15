import { SearchComponent } from './views/search/search.component';
import { ZorroNgModule } from '../../ng-zorro/zorro-ng.module';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HeroeComponent } from './views/heroe/heroe.component';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { TranslocoService } from '@ngneat/transloco';
import { HeroeRoutingModule } from './heroe-routing.module';

@NgModule({
  imports: [
    CommonModule,
    ZorroNgModule,
    TranslocoRootModule,
    HeroeRoutingModule,
  ],
  declarations: [HeroeComponent, SearchComponent],
})
export class HeroeModule {
  constructor(private translocoService: TranslocoService) {}
}
