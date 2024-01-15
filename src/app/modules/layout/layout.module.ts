import { ZorroNgModule } from '../../ng-zorro/zorro-ng.module';
import { RouterModule } from '@angular/router';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarPage } from './views/navbar/navbar.page';
import { TranslocoRootModule } from 'src/app/transloco-root.module';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [
    CommonModule,
    RouterModule,
    ZorroNgModule,
    TranslocoRootModule,
    FormsModule,
  ],
  exports: [],
  declarations: [NavbarPage],
})
export class LayoutModule {}
