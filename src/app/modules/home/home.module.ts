import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './views/home.component';
import { ZorroNgModule } from 'src/app/ng-zorro/zorro-ng.module';
import { HomeRoutingModule } from './home-routing.module';

@NgModule({
  declarations: [HomeComponent],
  imports: [ZorroNgModule, CommonModule, HomeRoutingModule],
})
export class HomeModule {}
