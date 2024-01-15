import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { sharedEnvironment } from '../environments/environment';

@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) {}

  getTranslation(lang: string) {
    return this.http.get<Translation>(`./assets/default/i18n/${lang}.json`);
    // In case we get translations from backend
    /* return this.http.get<Translation>(`${sharedEnvironment.apiUrl}/conf/i18n/${lang}.json`); */
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: sharedEnvironment.transloco.availableLangs,
        defaultLang: sharedEnvironment.transloco.defaultLang,
        fallbackLang: sharedEnvironment.transloco.defaultLang,
        // Remove this option if your application doesn't support changing language in runtime.
        reRenderOnLangChange: true,
        prodMode: sharedEnvironment.production,
        missingHandler: {
          allowEmpty: true,
          useFallbackTranslation: true,
          logMissingKey: !sharedEnvironment.production,
        },
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {}
