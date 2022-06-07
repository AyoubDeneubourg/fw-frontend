import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { combineLatest, concat, merge, Observable, of, pipe, Subject } from 'rxjs';

import {
  AngularFireDatabase,
  AngularFireList,
  AngularFireObject,
} from '@angular/fire/compat/database';
import { ChatService } from 'src/app/core/services/firebase/chat.service';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { combineAll, map, mergeMap, switchMap, take, tap } from 'rxjs/operators';
import { collection, getDocs } from 'firebase/firestore';
import { Firestore } from '@angular/fire/firestore';

import { AuthService } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/shared/models/common';
import { ActivatedRoute, Event, NavigationEnd, NavigationStart, Router } from '@angular/router';


@Component({
  selector: 'app-chat',
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss']
})
export class ChatComponent implements OnInit {

  @ViewChild('autoScroll') private myScrollContainer: ElementRef;

  public authedUser: User;
  public routeId: number | string;

  public chatId: number | string;
  public bucketListArray: any = [];

  public chats = [];

  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}

  ngOnInit(): void {



   
    this.authedUser = this.authService.loggedInUser;
 

    const resultA = this.angularFirestore.collection ('test2', ref => {
      return ref.where('user_1', '==', this.authedUser.id.toString());
    });
  
   
    const resultB = this.angularFirestore.collection('test2', ref => {
      return ref.where('user_2', '==', this.authedUser.id.toString());
    });
   
  
  
    const angularFirestore = concat(of(resultA), of(resultB));
  
  
       
    angularFirestore.subscribe(data => {

      data.valueChanges().subscribe((dataz: any) => {
        
        console.log(dataz);
        console.log(this.chats);
      //  let y = this.chats.find(x => x.user_1 == dataz[0]?.user_1 && x.user_2 == dataz[0]?.user_2);

        dataz.forEach(element2 => {

          let y = this.chats.find(x => x.user_1 == element2.user_1 && x.user_2 == element2.user_2);

          console.log(y);
          console.log(typeof y);
          if(typeof y == 'undefined') {

  
            
            let userId = this.authedUser.id == element2.user_1 ? element2.user_2 : element2.user_1;
            console.log(userId);
            console.log(this.authedUser.id);
            console.log(element2.user_2);
            console.log(element2.user_1);
           
            this.authService.getUser(userId).pipe(
              tap(user => {

                element2 = {...element2, ...user };
                this.chats.push(element2)
                console.log(this.chats);
              }
              )).subscribe();

      
            } else {
              y.messages = element2.messages;
            }

          
        });
     //   if(typeof y == 'undefined') {

      //  this.chats.push(...dataz);

    //  }
      
    }
      
      );
    });




    this.route.params.subscribe(params  =>  {
        
      if(this.route.snapshot.params.id) {
          
      this.routeId = this.route.snapshot.params.id;

      this.getFirebaseChat();
     

    }

});

  }


  public getUser2(): string {

    // console.log(this.getUser2())

    //  return this.authService.getUser(id).pipe(take(1));
    return "zzz";
  
    }

  
  public getUser(id) {

    // let x;

 /*    return this.authService.getUser(id).pipe(
      map(user => {
        return user
      }
      )); */

  //return x;

  }
  public getFirebaseChat() {

    let id;

      
    this.angularFirestore.collection('test2', ref => {
      ref.where('user_2', '==', this.authedUser.id.toString())
      .where('user_1', '==', this.route.snapshot.params.id.toString())
      .get()
      .then(function(querySnapshot) {

        if(typeof querySnapshot?.docs[0]?.id != 'undefined') id = querySnapshot.docs[0].id;


      }); return ref.where('user_2', '==', this.authedUser.id.toString())
      .where('user_1', '==', this.route.snapshot.params.id.toString());
       }).valueChanges().subscribe((data: any) => {
        if(data[0]?.messages) this.bucketListArray = data[0];
         if(typeof id != 'undefined') this.chatId = id;

         setTimeout(() => {
          this.scrollToBottom();
         }, 100);
      });


      this.angularFirestore.collection('test2', ref => {
        ref.where('user_1', '==', this.authedUser.id.toString())
        .where('user_2', '==', this.route.snapshot.params.id.toString())
        .get()
        .then(function(querySnapshot) {

          if(typeof querySnapshot?.docs[0]?.id != 'undefined') id = querySnapshot.docs[0].id;

        }); return ref.where('user_1', '==', this.authedUser.id.toString())
        .where('user_2', '==', this.route.snapshot.params.id.toString());
         }).valueChanges().subscribe((data: any) => {
           if(data[0]?.messages) this.bucketListArray = data[0];
           if(typeof id != 'undefined') this.chatId = id;

           setTimeout(() => {
             this.scrollToBottom();
            }, 100);
        });

    }

  constructor(private firestore: Firestore,  
    private angularFirestore: AngularFirestore,  
    private chatService: ChatService, 
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute) {}



    public sendMessage() {

      let textArea = document.getElementById('textAreaId') as HTMLInputElement;
      if(textArea.value.trim().length === 0) return;
      let newChat = this.chatService.sendMessage(textArea.value, this.bucketListArray, this.chatId, this.authedUser.id, this.route.snapshot.params.id);
    
   
      textArea.value = "";
      if(newChat) this.getFirebaseChat();

      console.log(this.chats)

    }

}
interface Item {
  name: string
};