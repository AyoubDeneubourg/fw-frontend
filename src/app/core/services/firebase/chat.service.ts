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

  booksRef: AngularFireList<any>;
  bookRef: AngularFireObject<any>;

  user: User;
  constructor(private angularFirestore: AngularFirestore, private authService: AuthService) {

    this.authService.loggedInUser$.subscribe(user => {
      this.user = user;
    });

    

  }


  itemmm: any;

  AddBook() {

    this.itemmm = this.angularFirestore.doc('tutorial');
    this.angularFirestore.collection('chat').doc('2').get();


/*     this.zz.firestore.doc('chat').collection('chat').add({
      name: 'test'
    }); */


  }


  sendMessage(message: string, arr, chat_id, sender_id, receiver_id): boolean {


    console.log(arr)
    console.log(arr.length)

     let newMessage = {
      sender_id: sender_id,
      message: message.slice(0,2000),
      timestamp: new Date()
    }

    console.log(arr.user_2)

    if(arr.user_2 && arr.user_1) {
      console.log("arr", chat_id)
      this.angularFirestore.doc('test2/' + chat_id).set({
        user_1: arr?.user_1,
        user_2: arr?.user_2,
        messages: [...arr?.messages, newMessage],
      });
 
      return false;
    } else {

      console.log("enter ici ptit con")
      
      this.angularFirestore.collection('test2').add({
        user_1: sender_id.toString(),
        user_2: receiver_id.toString(),
        messages: [newMessage],
      });

      return true;
    }
    






    console.log("Heree");

    /*
    this.angularFirestore.collection('chat').doc(this.user.id.toString()).collection('2').add({
      message: message,
      type: 'sent',
      date:  new Date(),
    }); */
  
  }



  getUserInformation(id: string) {

    return this.authService.getUser(id);

  }


  getMessages() {

    return this.angularFirestore.collection('chat').doc("2").valueChanges();
    


  }
}
