import {Component} from '@angular/core';
import {Platform} from 'ionic-angular';
import {StatusBar} from '@ionic-native/status-bar';
import {SplashScreen} from '@ionic-native/splash-screen';
import { AnalyticsService} from './analytics/analytics.service';
import {TabPage} from '@pages/tabs/tabs';
import {environment} from '@env';

declare var ga: Function;

@Component({
  templateUrl: 'app.html'
})
export class MyApp {

  rootPage = TabPage;

  constructor(private platform: Platform,
              private statusBar: StatusBar,
              private analytics: AnalyticsService,
              private splashScreen: SplashScreen) {

    this.platform.ready().then(() => {
      this.statusBar.overlaysWebView(false);
      this.statusBar.backgroundColorByHexString('#4CAF50');
      this.splashScreen.hide();
      if (ga) { ga('set', 'platform_type', 'ionic_mobile'); }
    });
    // Placed outside as the platform.ready method may only be executed in ionic systems
    this.analytics.startTrackerWithId(environment.google_analytics_id);
  }
}
