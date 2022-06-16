import { Injectable } from '@angular/core';
import { TranslocoService } from '@ngneat/transloco';
import * as introJs from 'intro.js/intro.js';
import { take, tap } from 'rxjs/operators';
import { UserPreferencesService } from './../user-preferences/user-preferences.service';


@Injectable({
  providedIn: 'root'
})
export class IntrojsService {
  introJS = null;

  constructor(private translocoService: TranslocoService, private userPreferencesService: UserPreferencesService) { }



   


  startIntroduction(type: string) {

    this.introJS = introJs();
 
    let steps = [
        {
            title: "",
            element: '#step1',
            intro: '',
        },
        {
            title: "",
            element: '#step2',
            intro: '',
        },
        {
            title: "",
            element: '#step3',
            intro: '',
        }, 
        {
            title: "",
            element: '#step4',
            intro: '',
        }, 
        {
            title: "",
            element: '#step5',
            intro: '',
        }, 
        {
            title: "",
            element: '#step6',
            intro: '',
        }, 
        {
            title: "",
            element: '#step7',
            intro: '',
        }, 
    ]
    
    this.translocoService.selectTranslate('introduction.step1.content').pipe(take(1),tap(value => { steps[0].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step2.content').pipe(take(1),tap(value => { steps[1].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step3.content').pipe(take(1),tap(value => { steps[2].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step4.content').pipe(take(1),tap(value => { steps[3].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step5.content').pipe(take(1),tap(value => { steps[4].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step6.content').pipe(take(1),tap(value => { steps[5].intro = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step7.content').pipe(take(1),tap(value => { steps[6].intro = value; })).subscribe();

    this.translocoService.selectTranslate('introduction.step1.title').pipe(take(1),tap(value => { steps[0].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step2.title').pipe(take(1),tap(value => { steps[1].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step3.title').pipe(take(1),tap(value => { steps[2].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step4.title').pipe(take(1),tap(value => { steps[3].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step5.title').pipe(take(1),tap(value => { steps[4].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step6.title').pipe(take(1),tap(value => { steps[5].title = value; })).subscribe();
    this.translocoService.selectTranslate('introduction.step7.title').pipe(take(1),tap(value => { steps[6].title = value; })).subscribe();
    
    if(type == "INFLUENCER") {





    this.introJS
        .setOptions({
           steps
        }).start();


              
   } else {


  
    let value = "#step3";


     steps = steps.filter(item => item.element !== value)
    console.log(steps);


    this.introJS
        .setOptions({
            steps
        }).start();


   }
        
   

      this.introJS.oncomplete(() => {
        this.userPreferencesService.update({ introduction: true });


      });


}



}
