
## Installation for development
```bash
sudo npm install --unsafe-perm -g node-sass # Used to resolve issues with node-sass on macos
npm install
```

Run project using ionic app-scripts
```bash
npm run ionic:serve
```

## Building for Platforms


### Building for Android

```bash
cordova plugin rm cordova-plugin-console
cordova build --release android
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ict4sdg.keystore platforms/android/build/outputs/apk/android-release-unsigned.apk #enter password
~/Library/Android/sdk/build-tools/23.0.0/zipalign -v 4 platforms/android/build/outputs/apk/android-release-unsigned.apk signed_releases/APP_NAME_$(date +%F).apk
```

### Building for iOS
