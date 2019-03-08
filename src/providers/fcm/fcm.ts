import { Injectable } from '@angular/core';
import { Firebase } from '@ionic-native/firebase';
import { Platform } from 'ionic-angular';
import { AngularFirestore } from '@angular/fire/firestore';
@Injectable()
export class FcmProvider {

  constructor(public firebaseNative: Firebase,
              public afs: AngularFirestore,
              private platform: Platform) {
    console.log('Hello FcmProvider Provider');
  }


  // Get permission from the user
  async getToken() {
    console.log("Attempting to retrieve token");
    let token;

    if (this.platform.is('android')) {
      console.log("Platform is Android");
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }
    else if (this.platform.is('ios')) {
      console.log("Platform is Android");
      token = await this.firebaseNative.getToken();
      await this.firebaseNative.grantPermission();
    }else{
      console.log("Platform is probably web ... need to retrieve token from storage");
    }


    return this.saveTokenToFirestore(token);
  }

  // Save the token to firestore
  private saveTokenToFirestore(token) {
    if (!token) {
      console.warn("No token received... Probably using the browser");
      return;
    }

    const devicesRef = this.afs.collection('devices');

    const docData = {
      token,
      userId: 'testUser', //TODO get current device id
    };
    console.log(docData);

    return devicesRef.doc(token).set(docData);
  }

  // Listen to incoming FCM messages
  listenToNotifications() {

    return this.firebaseNative.onNotificationOpen();
  }

}
