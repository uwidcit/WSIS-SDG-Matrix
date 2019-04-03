

## Bfore building
1. Ensure android-versionCode and version in the config.xml file was incremented
2. 

### For Android
1. Test application in production mode first
```bash
ionic cordova run android --prod
```

2. Build the production version of the application
```bash
ionic cordova build --release android --prod
```

3. Navigate to build folder
```bash
cd platforms\android\app\build\outputs\apk\release\
``` 

4. Place the keystore in the ict4sdg.keystore file in the release folder


5. Sign the application with the keystore
```bash
jarsigner -verbose -sigalg SHA1withRSA -digestalg SHA1 -keystore ict4sdg.keystore app-release-unsigned.apk ict4sdg
```

6. Remove previously built files
```bash
rm ICT4SDG.apk
```

7. Zip Align
```bash 
zipalign -v 4 app-release-unsigned.apk ICT4SDG.apk
```
