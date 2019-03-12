import {Injectable} from '@angular/core';
import {Firebase} from '@ionic-native/firebase';
import {Platform} from 'ionic-angular';
import {AngularFirestore} from '@angular/fire/firestore';
import {Device} from '@ionic-native/device';
import {environment} from "@env";

@Injectable()
export class FcmProvider {

  is_debug = environment.is_debug;

  constructor(public firebaseNative: Firebase,
              public afs: AngularFirestore,
              public device: Device,
              private platform: Platform) {
    if (this.is_debug) {
      console.log('FcmProvider Provider instantiated');
    }
  }

  // Get and store the token
  async getToken() {
    if (this.is_debug) {
      console.log("Attempting to retrieve token");
    }
    let token;
    try {

      if (this.platform.is('android') || this.platform.is('ios')) {
        // Check if the user has the permission
        let isGranted = await this.firebaseNative.hasPermission();
        // if we do not have the permission, then we attempt to request the user for permission
        if (!isGranted) {
          isGranted = await this.firebaseNative.grantPermission();
        }
        // Retrieve the token to be able to know the device to be updated
        token = await this.firebaseNative.getToken();
      }

      this.firebaseNative.onTokenRefresh().subscribe(token => {
        if (this.is_debug) {
          console.log("Token was updated by Firebase, updating token on firestore");
        }
        this.saveTokenToFirestore(token);
      });

      return this.saveTokenToFirestore(token);
    } catch (e) {

      console.error(e);
    }
  }

  // Save the token to firestore
  async saveTokenToFirestore(token) {
    if (!token) {
      console.warn("No token received... Probably using the browser");
      return;
    }
    try {
      console.log('Successfully received token. Attempting to get a device id and store to Firestore');
      const devicesRef = this.afs.collection('devices');
      const deviceId = this.device.uuid;
      if (this.is_debug) {
        console.log(deviceId);
      }
      // Generate the record that uses both the tokens and the device id
      const docData = {
        token: token,
        userId: deviceId
      };
      if (this.is_debug) {
        console.log(docData);
      }
      // Store the record using the device id to attempt to keep upate tokens for existing devices
      return devicesRef.doc(deviceId).set(docData);
    } catch (e) {
      console.error(e);
      return;
    }
  }

  // Listen to incoming FCM messages
  listenToNotifications() {
    return this.firebaseNative.onNotificationOpen();
  }

}
