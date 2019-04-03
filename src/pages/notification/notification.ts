import {Component} from '@angular/core';
import {AlertController, IonicPage, LoadingController, NavController, NavParams} from 'ionic-angular';
import {AngularFireAuth} from "@angular/fire/auth";
import {AngularFirestore, AngularFirestoreCollection} from "@angular/fire/firestore";
import {environment} from "@env";
import {first} from "rxjs/operators";
import {Storage} from '@ionic/storage';


@IonicPage()
@Component({
  selector: 'page-notification',
  templateUrl: 'notification.html',
})
export class NotificationPage {

  messages: Array<any>; // listing of all messages
  seenMessages: Array<any>; // listing of the messages previously seenMessages
  unseenMessages: Array<any>; // list of new messages based on when last system was seenMessages

  collectionRef: AngularFirestoreCollection<any>;
  is_debug = !environment.production;
  message_limit = 10;

  constructor(public navCtrl: NavController,
              public afAuth: AngularFireAuth,
              public afs: AngularFirestore,
              public alertCtrl: AlertController,
              public storage: Storage,
              public loadingCtrl: LoadingController,
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
    this.requestMessages();

  }

  requestMessages() {
    this.collectionRef = this.afs.collection('sent_messages', ref => ref.orderBy('date_created', 'desc').limit(this.message_limit));

    const loading = this.loadingCtrl.create({
      content: 'Loading notifications'
    });
    loading.present();

    this.collectionRef.valueChanges().subscribe(async recs => {
      let lastSeenTimestamp = new Date().getTime(); // Using the current date by default
      // Attempt to retrieve the last time seen from the database
      try {
        await this.storage.ready();
        this.storage.get('last_time').then(res => console.log(res));
        lastSeenTimestamp = new Date(await this.storage.get('last_time')).getTime();
      } catch (e) {
        console.log(e);
      }
      console.log(lastSeenTimestamp);

      let seenIndex = -1;

      // Process the messages received
      this.messages = recs.map((el, index) => {
        // since we know the records are sorted by date, we check if any dates are more recent than the last seen time
        console.log(`Comparing ${el.date_created.toDate().getTime()} and ${lastSeenTimestamp}`);
        if (el.date_created.toDate().getTime() > lastSeenTimestamp) {
          seenIndex = index;
        }
        return el;
      });
      console.log(`Seen is ${seenIndex}`);
      // split into seenMessages and unseenMessages messages
      this.unseenMessages = this.messages.slice(0, seenIndex + 1);
      this.seenMessages = this.messages.slice(seenIndex + 1, this.messages.length);
      // Update the last time seen to the database
      this.storage
        .set('last_time', this.messages[0].date_created.toDate().getTime())
        .then(_ => console.log('Date updated'))
        .catch(err => console.error(err));

      loading.dismiss();
    });
  }


  displayMessage(message) {
    // if (this.is_debug) { console.log(message); }
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
