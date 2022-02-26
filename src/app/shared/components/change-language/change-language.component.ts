import { Component, OnInit } from '@angular/core';
import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';
import { TranslocoService } from '@ngneat/transloco';
import { SUPPORTED_LANGUAGES } from '../../translations/transloco-root.module';

@Component({
  selector: 'app-change-language',
  templateUrl: './change-language.component.html',
  styleUrls: ['./change-language.component.scss']
})
export class ChangeLanguageComponent implements OnInit {


  public supportedLanguages = SUPPORTED_LANGUAGES;

  constructor(
    private preferencesService: UserPreferencesService,
    private translocoService: TranslocoService,
  ) { }


  ngOnInit(): void {
  }

  public isActiveLang(language: string): boolean {
    return this.translocoService.getActiveLang() === language;
  }


  public proceedInFrench(): void {
    this.proceedUsing(SUPPORTED_LANGUAGES.fr)
  }

  public proceedInDutch(): void {
    this.proceedUsing(SUPPORTED_LANGUAGES.nl)
  }

  public proceedInEnglish(): void {
    this.proceedUsing(SUPPORTED_LANGUAGES.en)
  }


  private proceedUsing(language: string): void {

    this.translocoService.setDefaultLang(language);
    this.translocoService.setActiveLang(language);

    this.preferencesService.update({ language });


  }


}
