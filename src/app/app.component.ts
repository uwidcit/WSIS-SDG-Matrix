import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';

import {TabPage} from '../pages/tabs/tabs';


@Component({
  templateUrl: 'app.html'
})

export class MyApp {

  rootPage = TabPage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private splashScreen: SplashScreen) {

    platform.ready().then(() => {
      this.statusBar.backgroundColorByHexString('#4CAF50');
      this.splashScreen.hide();
    });
  }
}
