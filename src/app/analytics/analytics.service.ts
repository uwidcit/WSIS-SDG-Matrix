import {Injectable} from '@angular/core';
import {environment} from '@env';
import {Platform} from 'ionic-angular';

declare var ga: Function;

@Injectable()
export class AnalyticsService {

  public readonly USER_CAT = 'user';
  public readonly SYS_CAT = 'system';
  private is_debug: boolean;

  constructor(private platform: Platform) {
    this.is_debug = !environment.production;
  }

  startTrackerWithId(id) {
    if (this.is_debug) {
      console.log('Attempting to start the GA analytics tracker');
    }
    try {
      if (typeof ga === 'function') {
        if (environment.use_tracking) {
          ga('create', {
            storage: 'none',
            trackingId: id,
            clientId: localStorage.getItem('ga:clientId')
          });
          ga('set', 'checkProtocolTask', null);​
          ga('set', 'connection', 'online');
          ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
          // Determine what platform is loaded
          this.setPlatformType();
          // Attempt to retrieve and set the client id
          ga((tracker) => {
            if (!localStorage.getItem('ga:clientId')) {
              localStorage.setItem('ga:clientId', tracker.get('clientId'));
            }
          });
          if (this.is_debug) {
            console.log('GA analytics tracker successfully initialised');
          }
          return true;
        }
      }
    } catch (e) {
      if (this.is_debug) {
        console.error("Unable to load analytics tracker: ");
        console.error(e);
      }
    }
    return false;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Use to track the different views/screens that a user visits within the app
   * @param screenName
   */
  trackView(screenName) {
    try {
      if (typeof ga === 'function' && environment.use_tracking) { // It is possible that the google script is not loaded (e.g. ad blockers
        if (this.is_debug) {
          console.log(screenName);
        }
        ga('set', 'page', screenName);
        ga('send', 'pageview');
        return true;
      }
    } catch (e) {
      if (this.is_debug) {
        console.error(e);
      }
    }
    return false;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Used to track events that occur within the system
   * @param category
   * @param action
   * @param label
   * @param value
   */
  trackEvent(category, action, label?, value?) {
    try {
      if (typeof ga === 'function' && environment.use_tracking) { // It is possible that the google script is not loaded (e.g. ad blockers)
        if (this.is_debug) {
          console.log('Category: %s, Action: %s', category, action);
        }
        ga('send', 'event', {
          eventCategory: category,
          eventLabel: label,
          eventAction: action,
          eventValue: value
        });
        return true;
      }
    } catch (e) {
      if (this.is_debug) {
        console.error(e);
      }
    }
    return false;
  }

  setPlatformType() {
    // Set the platform initially as web
    ga('set', 'platform_type', 'web');
    // The check what the platform is... we move from group to specific labels
    ['cordova', 'desktop', 'mobile', 'ios', 'pwa', 'android'].forEach((el) => {
      if (this.platform.is(el)) {
        if (typeof ga === 'function') { ga('set', 'platform_type', el); }
        console.log(el + ' was true');
      }
    });
  }
}
