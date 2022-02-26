import { UserPreferencesService } from 'src/app/core/services/user-preferences/user-preferences.service';

import { ChangeLanguageComponent } from './change-language.component';
import { TranslocoService } from '@ngneat/transloco';
import {
  Spectator,
  createComponentFactory,
  SpectatorService,
  createServiceFactory,
} from '@ngneat/spectator';
import { MockComponent } from 'ng-mocks';
import {
  TranslocoRootModule,
  SUPPORTED_LANGUAGES,
} from '../../translation/transloco-root.module';

describe('input validation component', () => {
  let spectator: Spectator<ChangeLanguageComponent>;

  const createSpectator = createComponentFactory({
    component: ChangeLanguageComponent,
    mocks: [UserPreferencesService, TranslocoService],
    providers: [],
    declarations: [MockComponent(ChangeLanguageComponent)],
    imports: [TranslocoRootModule],
  });

  let spectatorTranslocoService: SpectatorService<TranslocoService>;
  const createTranslocoService = createServiceFactory(TranslocoService);

  let spectatorUserPreferencesService: SpectatorService<UserPreferencesService>;
  const createUserPreferencesService = createServiceFactory(
    UserPreferencesService
  );

  beforeEach(() => {
    spectator = createSpectator();

    spectatorTranslocoService = createTranslocoService();
    spectatorUserPreferencesService = createUserPreferencesService();
  });

  it('should change the current language to DUTCH', () => {
    spectator.component.proceedInDutch();

    expect(spectatorTranslocoService.service.getActiveLang()).toBe(
      SUPPORTED_LANGUAGES.nl
    );
    expect(
      spectatorUserPreferencesService.service.currentPreferences.language
    ).toBe(SUPPORTED_LANGUAGES.nl);
  });

  it('should change the current language to FRENCH', () => {
    spectator.component.proceedInFrench();

    expect(spectatorTranslocoService.service.getActiveLang()).toBe(
      SUPPORTED_LANGUAGES.fr
    );
    expect(
      spectatorUserPreferencesService.service.currentPreferences.language
    ).toBe(SUPPORTED_LANGUAGES.fr);
  });
});
