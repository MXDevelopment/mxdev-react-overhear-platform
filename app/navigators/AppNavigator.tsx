/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */

// Imports to React
import React from "react"

// Imports to React-Native
import { useColorScheme } from "react-native"

// Imports For React-Navigation
import {
  DarkTheme,
  DefaultTheme,
  NavigationContainer,
} from "@react-navigation/native"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { StackScreenProps } from "@react-navigation/stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// MobX Imports
import { observer } from "mobx-react-lite"

// Imports To Local
import Config from "../config"
import { WelcomeScreen} from "../screens/WelcomeScreen"
import { TutorialHolderScreen } from "../screens/TutorialHolderScreen"
import { SignInScreen } from "../screens/SignInScreen"
import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

/**
 * This type allows TypeScript to know what routes are defined in this navigator
 * as well as what properties (if any) they might take when navigating to them.
 *
 * If no params are allowed, pass through `undefined`. Generally speaking, we
 * recommend using your MobX-State-Tree store(s) to keep application state
 * rather than passing state through navigation params.
 *
 * For more information, see this documentation:
 *   https://reactnavigation.org/docs/params/
 *   https://reactnavigation.org/docs/typescript#type-checking-the-navigator
 *   https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type AppStackParamList = {
  Welcome: undefined
  TutorialHolder: undefined
  SignIn: undefined
  // 🔥 Your screens go here
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
//  */

// const exitRoutes = Config.exitRoutes

// export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
//   AppStackParamList,
//   T
// >

// // Documentation: https://reactnavigation.org/docs/stack-navigator/
// const Stack = createNativeStackNavigator<AppStackParamList>()

const Tab = createBottomTabNavigator<AppStackParamList>()
//const Tab = createBottomTabNavigator()
const AppStack = observer(function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }} initialRouteName = "Welcome">
          <Tab.Screen name="Welcome" component={WelcomeScreen} />
          <Tab.Screen name="TutorialHolder" component={TutorialHolderScreen} />
          {/* <Tab.Screen name="SignIn" component={SignInScreen} /> */}
      {/** 🔥 Your screens go here */}
    </Tab.Navigator>
  )
})

// const Tab = createBottomTabNavigator<NavigatorParamList>()

// const AppStack = () => {
//   return (
//     <Tab.Navigator
//       screenOptions={{
//         headerShown: false,
//       }}
//       initialRouteName="createFood"
//     >
//       <Tab.Screen
//         name="createFood"
//         component={CreateFoodScreen}
//         options={{
//           tabBarIcon: () => <Icon name="carrot" size={30} color="#333" />,
//           title: "Create Food",
//         }}
//       />

//       <Tab.Screen
//         name="foodLogger"
//         component={FoodLoggerScreen}
//         options={{
//           tabBarIcon: () => <Icon name="clipboard-list" size={30} color="#333" />,
//           title: "Add Log",
//         }}
//       />

//       <Tab.Screen
//         name="report"
//         component={ReportScreen}
//         options={{
//           tabBarIcon: () => <Icon name="chart-area" size={30} color="#333" />,
//           title: "Report",
//         }}
//       />
//     </Tab.Navigator>
//   )
// }
interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme()

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName))

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  )
})
