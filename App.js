// This is the entry point if you run `yarn expo:start`
// If you run `yarn ios` or `yarn android`, it'll use ./index.js instead.
import App from "./app/app.tsx"
import React from "react"
import { registerRootComponent } from "expo"
import { Platform } from "react-native"
import * as SplashScreen from "expo-splash-screen"
import { AppRegistry } from 'react-native';
import { name as appName } from './app.json';

AppRegistry.registerComponent(appName, () => App);

SplashScreen.preventAutoHideAsync()

function IgniteApp() {
  return <App hideSplashScreen={SplashScreen.hideAsync} />
}

if (Platform.OS !== "web") {
  registerRootComponent(IgniteApp)
}

export default IgniteApp
