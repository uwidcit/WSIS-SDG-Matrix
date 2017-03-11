# WSIS-SDG-Matrix

Building for Android
---------------------

~~~~ 
cordova plugin rm cordova-plugin-console

cordova build --release android

jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ict4sdg.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk ict4sdg

~/Library/Android/sdk/build-tools/23.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk signed_releases/APP_NAME_$(date +%F).apk
~~~~ 
