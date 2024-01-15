import { sharedEnvironment } from 'src/environments/environment';
import { TranslocoService } from '@ngneat/transloco';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { LayoutService } from '../../layout.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.page.html',
  styleUrls: ['./navbar.page.scss'],
})
export class NavbarPage implements OnInit {
  public isCollapsed: boolean = false;
  public listOfLanguages: Array<{ value: string; label: string }> = [];
  public langDefault: string = sharedEnvironment.transloco.defaultLang;

  constructor(
    public layoutService: LayoutService,
    public translocoService: TranslocoService
  ) {}

  async ngOnInit() {
    this.layoutService.getLanguages().subscribe((lang: any) => {
      this.listOfLanguages = lang.map((item: any) => ({
        value: item.lang,
        label: item.labelRecurso,
      }));
    });
  }

  onChange(lang: string): void {
    this.translocoService.setActiveLang(lang);
  }

  toggleCollapsed(): void {
    this.isCollapsed = !this.isCollapsed;
  }
}
