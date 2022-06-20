import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { concat,  of, } from 'rxjs';


import { ChatService } from 'src/app/core/services/firebase/chat.service';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import {  tap } from 'rxjs/operators';
import { Firestore } from '@angular/fire/firestore';

import { AuthService, Color } from 'src/app/core/services/auth-service/auth.service';
import { User } from 'src/app/shared/models/common';
import { ActivatedRoute, Router } from '@angular/router';


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

  public newChat;

  public chats = [];

  public color: Color;
  
  scrollToBottom(): void {
    try {
        this.myScrollContainer.nativeElement.scrollTop = this.myScrollContainer.nativeElement.scrollHeight;
    } catch(err) { }                 
}



  ngOnInit(): void {

    if(this.route.snapshot.params.id) {
      this.routeId = this.route.snapshot.params.id;
      this.authService.getUser(this.route.snapshot.params.id).subscribe(
        res => {
          this.newChat = res;
        },
        err => {
          this.router.navigateByUrl('/chat');
        }
      )
    }

    this.authService
    this.color = this.authService.colors;


   
    this.authedUser = this.authService.loggedInUser;
 

    const resultA = this.angularFirestore.collection ('conversations', ref => {
      return ref.where('user_1', '==', this.authedUser.id.toString());
    });
  
   
    const resultB = this.angularFirestore.collection('conversations', ref => {
      return ref.where('user_2', '==', this.authedUser.id.toString());
    });
   
  
  
    const angularFirestore = concat(of(resultA), of(resultB));
  
  
       
    angularFirestore.subscribe(data => {

      data.valueChanges().subscribe((dataz: any) => {
        
      //  let y = this.chats.find(x => x.user_1 == dataz[0]?.user_1 && x.user_2 == dataz[0]?.user_2);

        dataz.forEach(element2 => {

          let y = this.chats.find(x => x.user_1 == element2.user_1 && x.user_2 == element2.user_2);

          if(typeof y == 'undefined') {

  
            
            let userId = this.authedUser.id == element2.user_1 ? element2.user_2 : element2.user_1;
           
            this.authService.getUser(userId).pipe(
              tap(user => {

                element2 = {...element2, ...user };
                this.chats.push(element2)

                
                this.chats = this.chats.sort((a, b) => {
                  return a?.messages[a?.messages?.length - 1]?.timestamp?.seconds > b?.messages[b?.messages?.length - 1]?.timestamp?.seconds ? -1 : 1;
                });

              
              } 
              )).subscribe();

      
            } else {
              y.messages = element2.messages;

              this.chats = this.chats.sort((a, b) => {
                return a?.messages[a?.messages?.length - 1]?.timestamp?.seconds > b?.messages[b?.messages?.length - 1]?.timestamp?.seconds ? -1 : 1;
              });
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



  public getFirebaseChat() {

    let id;

      
    this.angularFirestore.collection('conversations', ref => {
      ref.where('user_2', '==', this.authedUser.id.toString())
      .where('user_1', '==', this.route.snapshot.params.id.toString())
      .get()
      .then(function(querySnapshot) {
        if(typeof querySnapshot?.docs[0]?.id != 'undefined') id = querySnapshot.docs[0].id;


      }); return ref.where('user_2', '==', this.authedUser.id.toString())
      .where('user_1', '==', this.route.snapshot.params.id.toString());
       }).valueChanges().subscribe((data: any) => {
        if(data[0]?.user_2 == this.route.snapshot.params.id.toString() || data[0]?.user_1 == this.route.snapshot.params.id.toString()) {
          if(data[0]?.messages) {
            this.bucketListArray = data[0];
            this.newChat = null;
          } 
          if(typeof id != 'undefined') this.chatId = id;
        }
         setTimeout(() => {
          this.scrollToBottom();
         }, 50);
      });


      this.angularFirestore.collection('conversations', ref => {
        ref.where('user_1', '==', this.authedUser.id.toString())
        .where('user_2', '==', this.route.snapshot.params.id.toString())
        .get()
        .then(function(querySnapshot) {

          if(typeof querySnapshot?.docs[0]?.id != 'undefined') id = querySnapshot.docs[0].id;

        }); return ref.where('user_1', '==', this.authedUser.id.toString())
        .where('user_2', '==', this.route.snapshot.params.id.toString());
         }).valueChanges().subscribe((data: any) => {
          if(data[0]?.user_2 == this.route.snapshot.params.id.toString() || data[0]?.user_1 == this.route.snapshot.params.id.toString()) {
            if(data[0]?.messages) {
              this.bucketListArray = data[0];
              this.newChat = null;

            }
            

            if(typeof id != 'undefined') this.chatId = id;
          }
           setTimeout(() => {
             this.scrollToBottom();
            }, 50);
        });

    }

  constructor(private firestore: Firestore,  
    private angularFirestore: AngularFirestore,  
    private chatService: ChatService, 
    private authService: AuthService,
    private router: Router, 
    private route: ActivatedRoute) {}



    public sendMessage() {

      this.newChat = null;

      let textArea = document.getElementById('textAreaId') as HTMLInputElement;
      if(textArea.value.trim().length === 0) return;
      let newChat = this.chatService.sendMessage(textArea.value, this.bucketListArray, this.chatId, this.authedUser.id, this.route.snapshot.params.id);
    
   
      textArea.value = "";
      if(newChat) this.getFirebaseChat();


    }

}
interface Item {
  name: string
};