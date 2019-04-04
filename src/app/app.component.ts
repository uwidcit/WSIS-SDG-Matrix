import {Component} from '@angular/core';
import {AlertController, App, Platform, ToastController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import {AnalyticsService} from './analytics/analytics.service';
import {TabPage} from '@pages/tabs/tabs';
import {environment} from '@env';
import {FcmProvider} from "../providers/fcm/fcm";

import {tap} from 'rxjs/operators';
import {AngularFireAuth} from "@angular/fire/auth";

// declare var ga: Function;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  rootPage = "TabPage";

  is_debug = environment.is_debug;

  constructor(private platform: Platform,
              private domSanitizer : DomSanitizer,
              private statusBar: StatusBar,
              private fcm: FcmProvider,
              private analytics: AnalyticsService,
              private toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public afAuth: AngularFireAuth,
              public app: App,
              private splashScreen: SplashScreen) {

    // Run platform dependent logic
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#4CAF50');
      this.splashScreen.hide();

      if (this.is_debug) {
        console.log(this.platform.platforms());
      }
      // Set up the application to handle incoming notifications
      if (this.platform.is('cordova')) {
        if (this.is_debug) {
          console.log(this.platform.platforms());
        }
        this.setupNotificationListener();
      } else {
        console.log('Not a cordova supported environment');
      }
      // Setup configuration to keep app from closing unintentionally when hardward back button is selected
      // this.preventUnwantedTermination();
    });
    // Placed outside as the platform.ready method may only be executed in ionic systems
    this.analytics.startTrackerWithId(environment.google_analytics_id);
    // Provide authentication to the user
    this.signIn2Firebase();
    // DOM Sanitizer to attempt to get Twitter within the app
    this.domSanitizer
      .bypassSecurityTrustResourceUrl('https://twitter.com/');
  }

  // Displays notification within the application when opened
  setupNotificationListener(){
    // Attempt to launch the process to get the device token to prompt for permission
    this.fcm.getToken();

    // if (this.is_debug) { console.log("Attempting to configure the notification listener"); }
    this.fcm.listenToNotifications().pipe(tap(msg => {
      // if (this.is_debug) { console.log("Notification received"); }
      const toast = this.toastCtrl.create({
        message: msg.body,
        duration: 3000
      });
      toast.present();
    })).subscribe();

    this.fcm.listenToNotifications().subscribe(el => console.log(`Notification: ${el}`));
    if (this.is_debug) {
      console.log("Successfully configured handler for notification");
    }
  }

  // https://www.codementor.io/syseverton/ionic-3-solving-the-hardware-back-button-avoiding-to-close-the-app-k23a6wu4e
  preventUnwantedTermination() {
    this.platform.registerBackButtonAction(() => {
      // Catches the active view
      try {
        let nav = this.app.getActiveNavs()[0];
        let activeView = nav.getActive();
        console.log(`Active navigation screen in ${activeView.name}`);
        // Checks if can go back before show up the alert
        if (activeView.name === 'HomePage') {
          if (nav.canGoBack()) {
            nav.pop();
          } else {
            const alert = this.alertCtrl.create({
              title: 'Exit the App',
              message: 'Are you would like to exit?',
              buttons: [{
                text: 'Cancel',
                role: 'cancel',
                handler: () => {
                  nav.setRoot('HomePage');
                }
              }, {
                text: 'Exit',
                handler: () => {
                  this.platform.exitApp();
                }
              }]
            });
            alert.present();
          }
        }
      } catch (e) {
        console.error(e);
      }
    });
  }

  signIn2Firebase(): any {
    this.afAuth.auth.signInAnonymously().then(res => {
      if (this.is_debug) {
        console.log("Application was signed in successfully");
        console.log(res);
      }
    }).catch(err => console.error(err));
  }

}


