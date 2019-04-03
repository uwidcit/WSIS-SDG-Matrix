
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ict4sdg.keystore app-release-unsigned.apk ict4sdg

zipalign -v 4 app-release-unsigned.apk ICT4SDG.apk


### For Android
```bash
ionic cordova build --release android --prod
```
