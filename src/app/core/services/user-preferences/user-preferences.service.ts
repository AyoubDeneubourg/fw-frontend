import { Inject, Injectable, Optional } from '@angular/core';
import { DOCUMENT } from '@angular/common';
@Injectable({
  providedIn: 'root'
})
export class UserPreferencesService {

  private readonly SESSION_STORAGE_KEY = 'user-preferences';
  private _preferencesTemp: UserPreferences;


  constructor(

    @Optional() @Inject(DOCUMENT) private injectedDocument: Document) {

    console.log([DOCUMENT, injectedDocument, injectedDocument.defaultView]);

    let preferences: UserPreferences;

    if (this.injectedDocument && injectedDocument.defaultView) {
      const localStorageContent = injectedDocument.defaultView.localStorage.getItem(this.SESSION_STORAGE_KEY);
      if (localStorageContent) {
        preferences = JSON.parse(localStorageContent);
        console.log('Preferences found in localStorage', localStorageContent);
      } else {
        console.log('No user preferences found, defaults will be used');
      }
    } else {
      console.log('No access to document object, preferences won\'t be stored');
    }

    this._preferencesTemp = Object.assign(this.defaultPreferences(), preferences || {});
    this.store();


  }

  public get currentPreferences(): UserPreferences {
    return Object.assign({}, this._preferencesTemp);
  }

  public update(newPreferences: Partial<UserPreferences>) {
    this._preferencesTemp = Object.assign(this._preferencesTemp, newPreferences);
    this.store();
  }

  private defaultPreferences(): UserPreferences {
    return {
      language: null,
    };
  }

  private store() {
    if (this.window && this.window.localStorage) {
      this.window.localStorage.setItem(this.SESSION_STORAGE_KEY, JSON.stringify(this._preferencesTemp));
    }
  }


  private get window(): Window {
    return this.injectedDocument ? this.injectedDocument.defaultView : undefined;
  }

}




/**
 * Preferences that can be set by the user.
 */
export interface UserPreferences {
  language: string;
}