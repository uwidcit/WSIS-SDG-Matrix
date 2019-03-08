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

// declare var ga: Function;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = "TabPage";

  constructor(private platform: Platform,
              private domSanitizer : DomSanitizer,
              private statusBar: StatusBar,
              private fcm: FcmProvider,
              private analytics: AnalyticsService,
              private toastCtrl: ToastController,
              public alertCtrl: AlertController,
              public app: App,
              private splashScreen: SplashScreen) {

    // Run platform dependent logic
    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#4CAF50');
      this.splashScreen.hide();

      console.log(this.platform.platforms());

      // Setup configuration to keep app from closing unintentionally when hardward back button is selected
      this.preventUnwantedTermination();
    });
    // Placed outside as the platform.ready method may only be executed in ionic systems
    this.analytics.startTrackerWithId(environment.google_analytics_id);
    if (this.platform.is('cordova')) {
      this.setupNotificationListener();
    }

    this
      .domSanitizer
      .bypassSecurityTrustResourceUrl('https://twitter.com/');
  }

  // Displays notification within the application when opened
  setupNotificationListener(){
    console.log("Attempting to configure the notification listener");
    this.fcm.listenToNotifications().pipe(tap(msg => {
      console.log("Notification received");
      const toast = this.toastCtrl.create({
        message: msg.body,
        duration: 3000
      });
      toast.present();
    })).subscribe();

    this.fcm.listenToNotifications().subscribe(el => console.log(`Notification: ${el}`));
    console.log("Successfully configured handler for notification");
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
}


