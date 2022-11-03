<!-- README.md -->
Expo CLI version: v6.0.6
Node version: v16.15.0
Yarn version: v1.22.19

You can use the package.json file to see all the versions of packages I use for the scaffolding. They mirror the original app


### Steps I took to reproduce the issue.

I scaffolded a new react native expo app
Installed the Smile React Native SDK using the command

```bash
yarn add rn-smile-id
```

I replaced the contents of ``App.js`` with the code snippet from [here](https://github.com/smileidentity/SID_React_Sample)

Prebuild the app for android only using the expo command 

```bash
expo prebuild --platform android
```
The above command will create an android folder inside the root of the project
To prebuild the expo app to work in Hybrid mode allowing me to modify native code while still using Javascript for presentation part of the app.

According to the documentation, I am to do a gradle integration. So, I headed to ``android/build.gradle`` and added the follwing rules that included the Maven Central repository

```gradle
buildscript {   
    repositories {        
        mavenCentral() // add the maven central repository
        maven {
            url 'https://oss.sonatype.org/content/repositories/snapshots/'
		}
	}
}
```

Next, I added the following entries to the ``android/app/build.gradle`` file. I was told to apply the Smile ID plugin. I guess this should be where a custom plugin should be, but I am not sure what to look for

```gradle
apply plugin: 'com.smileidentity.smile-id-android'
```

Next, I declared the smile ID android SDK in my root level gradle file: ``android/build.gradle`` using the following entries

```gradle
dependencies {  
classpath group: 'com.smileidentity', name: 'smile-id-android', version: '1.0.1'
}
```

Next, I headed to the Android manifest and added the necessary app permissions as required by the documentation

```xml
  <uses-permission android:name="android.permission.CAMERA" />
  <uses-permission android:name="android.permission.READ_PHONE_STATE" />
  <uses-permission android:name="android.permission.INTERNET" />
  <uses-permission android:name="android.permission.ACCESS_NETWORK_STATE" />
  <uses-permission android:name="android.permission.ACCESS_FINE_LOCATION" />
  <uses-permission android:name="android.permission.WRITE_EXTERNAL_STORAGE" />
  <uses-permission android:name="android.permission.READ_EXTERNAL_STORAGE" />
```

Next I added the following activities under the application tag

```
 <!--id capture-->
<activity android:name="com.smileid.smileidui.SIDIDCaptureActivity" />
<!--selfie capture-->
<activity android:name="com.smileid.smileidui.SIDSelfieCaptureActivity" />
<!--selfie review screen-->
<activity android:name="com.smileid.smileidui.SIDReviewActivity" />
```

Finally, I copied the smile config file to the ``android/app`` directory

After doing the above, I restarted the expo server, using command

```sh
expo start
```

Once the app loads, clicking on each button throws an error
Clicking the file Path test logs the following error


```bash
[Unhandled promise rejection: TypeError: null is not an object (evaluating '_rnSmileId.default.getCurrentTags')]
````