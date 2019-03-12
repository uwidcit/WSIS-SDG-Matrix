import {Component} from '@angular/core';
import {AlertController, IonicPage, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {Observable} from "rxjs";
import {environment} from "@env";
import {first} from "rxjs/operators";


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  messages: Observable<any[]>;
  collectionRef: AngularFirestoreCollection<any>;
  is_debug = !environment.production;

  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public alertCtrl: AlertController,
              public navParams: NavParams) {
    if (this.is_debug) {
      console.log("Constructor of Notification page instantiated");
    }
  }

  //
  async ionViewDidLoad() {
    if (this.is_debug) {
      console.log('ionViewDidLoad of NotificationPage executed');
    }
    await this.ensureAppLoggedIn();

    this.collectionRef = this.afs.collection('sent_messages', ref => ref.orderBy('date_created', 'desc').limit(25));
    this.messages = this.collectionRef.valueChanges();
  }

  displayMessage(message) {
    if (this.is_debug) {
      console.log(message);
    }
    // window.alert(message.message);
    let subtitle = '';
    switch (parseInt(message.category)) {
      case 1:
        subtitle = "Event";
        break;
      case 2:
        subtitle = "General";
        break;
      case 3:
        subtitle = "High Priority";
        break;
      default:
        subtitle = "General";
    }
    const css = "alert-type-" + message.category;
    const msgAlert = this.alertCtrl.create({
      title: message.title,
      message: message.message,
      subTitle: subtitle,
      cssClass: css,
      buttons: [
        {text: 'OK'}
      ]
    });
    msgAlert.present();
    this.markMessageAsRead(message);
  }

  async ensureAppLoggedIn() {
    try {
      const user = await this.afAuth.authState.pipe(first()).toPromise();
      if (user) {
        if (this.is_debug) {
          console.log(" User is logged in");
        }
      } else {
        await this.afAuth.auth.signInAnonymously();
      }
    } catch (e) {
      console.error(e);
    }
  }

  markMessageAsRead(message: any) {

  }
}
