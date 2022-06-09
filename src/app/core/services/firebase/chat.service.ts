import { Injectable } from '@angular/core';
import { AngularFireDatabase, AngularFireList, AngularFireObject } from '@angular/fire/compat/database';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { User } from 'src/app/shared/models/common';
import { AuthService } from '../auth-service/auth.service';
import { Timestamp }  from "@angular/fire/firestore";


@Injectable({
  providedIn: 'root'
})
export class ChatService {


  user: User;

  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) {

    this.authService.loggedInUser$.subscribe(user => {
      this.user = user;
    });

    

  }




  sendMessage(message: string, arr, chat_id, sender_id, receiver_id): boolean {



     let newMessage = {
      sender_id: sender_id,
      message: message.slice(0,2000),
      timestamp: new Date()
    }


    if(arr.user_2 && arr.user_1) {
      this.angularFirestore.doc('test2/' + chat_id).set({
        user_1: arr?.user_1,
        user_2: arr?.user_2,
        messages: [...arr?.messages, newMessage],
      });
 
      return false;
    } else {

      
      this.angularFirestore.collection('test2').add({
        user_1: sender_id.toString(),
        user_2: receiver_id.toString(),
        messages: [newMessage],
      });

      return true;
    }
    

  
  }



  getUserInformation(id: string) {

    return this.authService.getUser(id);

  }


  getMessages() {

    return this.angularFirestore.collection('chat').doc("2").valueChanges();
    


  }
}
