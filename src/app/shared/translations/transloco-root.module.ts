import { HttpClient } from '@angular/common/http';
import {
  TRANSLOCO_LOADER,
  Translation,
  TranslocoLoader,
  TRANSLOCO_CONFIG,
  translocoConfig,
  TranslocoModule,
  TranslocoService,
} from '@ngneat/transloco';
import { Injectable, NgModule } from '@angular/core';
import { environment } from '../../../environments/environment';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';


export const SUPPORTED_LANGUAGES = {
  nl: 'nl-BE',
  fr: 'fr-BE',
  en: "en"
};



@Injectable({ providedIn: 'root' })
export class TranslocoHttpLoader implements TranslocoLoader {
  constructor(private http: HttpClient) { }

  getTranslation(lang: string) {
    return this.http.get<Translation>(
      `/assets/i18n/${lang}.json`
    );
  }
}

@NgModule({
  exports: [TranslocoModule],
  providers: [
    {
      provide: TRANSLOCO_CONFIG,
      useValue: translocoConfig({
        availableLangs: ['en', 'fr-BE', 'nl-BE'],
        defaultLang: 'en',
        reRenderOnLangChange: true,
        prodMode: environment.production,
      }),
    },
    { provide: TRANSLOCO_LOADER, useClass: TranslocoHttpLoader },
  ],
})
export class TranslocoRootModule {


  constructor(translocoService: TranslocoService,
    userPreferences: UserPreferencesService) {

    const preferredLanguage = userPreferences.currentPreferences?.language;

    if (!Object.values(SUPPORTED_LANGUAGES).some(supportedLang => supportedLang === preferredLanguage)) {

    } else {

      translocoService.setDefaultLang(preferredLanguage);
      translocoService.setActiveLang(preferredLanguage);
      userPreferences.update({ language: preferredLanguage });

    }
  }


}
