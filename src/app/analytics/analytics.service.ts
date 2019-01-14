import {Injectable} from '@angular/core';
import {environment} from '@env';

declare var ga: Function;

@Injectable()
export class AnalyticsService {

  public readonly USER_CAT = 'user';
  public readonly SYS_CAT = 'system';
  private is_debug: boolean;

  constructor() {
    this.is_debug = !environment.production;
  }

  // noinspection JSMethodCanBeStatic
  startTrackerWithId(id) {
    if (this.is_debug) { console.log('Attempting to start the GA analytics tracker'); }
    if (ga && environment.use_tracking) { // It is possible that the google script is not loaded (e.g. ad blockers)
      ga('create', {storage: 'none', trackingId: id, clientId: localStorage.getItem('ga:clientId')});
      ga('set', 'checkProtocolTask', null);​
      ga('set', 'connection', 'online');
      ga('set', 'transportUrl', 'https://www.google-analytics.com/collect');
      ga('set', 'platform_type', 'web');
      ga(function (tracker) {
        if (!localStorage.getItem('ga:clientId')) {
          localStorage.setItem('ga:clientId', tracker.get('clientId'));
        }
      });
      if (this.is_debug) { console.log('GA analytics tracker successfully initialised'); }
      return true;
    }
    return false;
  }

  // noinspection JSMethodCanBeStatic
  /**
   * Use to track the different views/screens that a user visits within the app
   * @param screenName
   */
  trackView(screenName) {
    if (ga && environment.use_tracking) { // It is possible that the google script is not loaded (e.g. ad blockers
      if (this.is_debug) { console.log(screenName); }
      ga('set', 'page', screenName);
      ga('send', 'pageview');
      return true;
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
    if (ga && environment.use_tracking) { // It is possible that the google script is not loaded (e.g. ad blockers)
      if (this.is_debug) { console.log('Category: %s, Action: %s', category, action); }
      ga('send', 'event', {
        eventCategory: category,
        eventLabel: label,
        eventAction: action,
        eventValue: value
      });
      return true;
    }
    return false;
  }
}
