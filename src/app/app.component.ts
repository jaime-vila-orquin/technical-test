import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { TranslocoService } from '@ngneat/transloco';
import { sharedEnvironment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  constructor(
    private router: Router,
    private translocoService: TranslocoService
  ) {
    this.initApp();
    if (this.router.url === '/') {
      this.router.navigate(['', 'home']);
    }
  }

  async initApp(): Promise<void> {
    this.disableConsoleLog();
  }

  initLang(): void {
    this.translocoService.setActiveLang(
      sharedEnvironment.transloco.defaultLang
    );
  }

  disableConsoleLog(): void {
    if (sharedEnvironment.disableConsoleLog) {
      const console = {
        log() {},
        error() {},
        debug() {},
        dir() {},
        warn() {},
        info() {},
      };
      (window as any).console = console;
    }
  }
}
