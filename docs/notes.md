# Notes

## Environment

The default ionic v3 at the time of install did not have a strategy for varying variables based on production and development systems.
We used the following tutorials to build a system:
* https://forum.ionicframework.com/t/injecting-environment-variables-into-the-build/111875


### Notifications
Notifications was implemented using the firebase plugin. To implement this functionality we used
https://angularfirebase.com/lessons/ionic-native-with-firebase-fcm-push-notifications-ios-android/
as a guided.
However important considerations should be made:
1. The tutorial uses an outdated version of angularfire2. Use the up-to-date version
2. We also had to upgrade rxjs and therefore install the compact the package
