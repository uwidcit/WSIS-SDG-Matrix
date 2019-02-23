import {Component} from '@angular/core';
import {Platform, ToastController} from 'ionic-angular';
import {DomSanitizer} from "@angular/platform-browser";

import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { AnalyticsService} from './analytics/analytics.service';
import {TabPage} from '@pages/tabs/tabs';
import {environment} from '@env';
import {FcmProvider} from "../providers/fcm/fcm";

import { tap } from 'rxjs/operators';

declare var ga: Function;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = TabPage;

  constructor(private platform: Platform,
              private domSanitizer : DomSanitizer,
              private statusBar: StatusBar,
              private fcm: FcmProvider,
              private analytics: AnalyticsService,
              private toastCtrl: ToastController,
              private splashScreen: SplashScreen) {



    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#4CAF50');
      this.splashScreen.hide();

      console.log(this.platform.platforms());
    });
    // Placed outside as the platform.ready method may only be executed in ionic systems
    this.analytics.startTrackerWithId(environment.google_analytics_id);
    if (this.platform.is('cordova')) {
      this.setupNotificationListener();
    }
  }

  ngOnInit() {
    this
      .domSanitizer
      .bypassSecurityTrustResourceUrl('https://twitter.com/');
  }

  setupNotificationListener(){
    console.log("Attempting to configure the notification listener");
    // this.fcm.listenToNotifications().pipe(tap(msg => {
    //   console.log("Notification received");
    //   const toast = this.toastCtrl.create({
    //     message: msg.body,
    //     duration: 3000
    //   });
    //   toast.present();
    // })).subscribe();

    this.fcm.listenToNotifications().subscribe(el => console.log(`Notification: ${el}`));
    console.log("Successfully configured handler for notification");
  }
}


