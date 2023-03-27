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

import { StackScreenProps } from "@react-navigation/stack"

// Navigator
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

// MobX Imports
import { observer } from "mobx-react-lite"

// Imports To Local
import Config from "../config"

// import { TestScreen } from "../screens/TestScreen"
import { WelcomeScreen } from "../screens/WelcomeScreen"
import { OverhearScreen } from "../screens/OverhearScreen"
import { LibraryScreen } from "../screens/LibraryScreen"
import { TutorialScreen } from "../screens/TutorialScreen"
import { SettingScreen } from "../screens/SettingScreen"
import { TestScreen } from "../screens/TestScreen"
import { SignInScreen } from "../screens/SignInScreen"

import { navigationRef, useBackButtonHandler } from "./navigationUtilities"

// Test Dependencies
import { Image, ImageStyle,Text, TextStyle, View, ViewStyle } from "react-native"

// Importing Local Style Dependencies
const libraryIcon = require('../screens/anima-imports/images/library-24-20-px.png')
const mapIcon = require('../screens/anima-imports/images/map-icon-22-20-px.png')
const wanderIcon = require('../screens/anima-imports/images/wander-20-22-px.png')
const mailIcon = require('../screens/anima-imports/images/mail-20px.png')
const settingsIcon = require('../screens/anima-imports/images/icons8-services-24.png')
const tutorialIcon = require('../screens/anima-imports/images/icons8-nook-24.png')
const signinIcon = require('../screens/anima-imports/images/icons8-guardian-24.png')

/**
 * 
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
  SignIn: undefined
  Overhear: undefined
  Library: undefined
  Tutorial: undefined
  Setting: undefined
  Test: undefined
}

/**
 * This is a list of all the route names that will exit the app if the back button
 * is pressed while in that screen. Only affects Android.
 */
const exitRoutes = Config.exitRoutes

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<
  AppStackParamList,
  T
>

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>()
const Tab = createBottomTabNavigator<NavigatorParamList>()

const navStyleConfig = {
backgroundColor: "#214176",
showIcon: true,
flexBasis: "10%"
}

const headerStyleConfig = {
  backgroundColor: "#214176",
  height: 120,

}

// headerShown file
const AppStack = observer(function AppStack() {
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: true, headerStyle: headerStyleConfig, tabBarStyle: navStyleConfig }} initialRouteName = "Welcome" backBehavior="history">
          <Tab.Screen name="Welcome" component={WelcomeScreen}
          options={
            {
              tabBarIcon: ({focused}) =>{
                return(
                  <Image source={wanderIcon} />
                )
              }
            }
          }
          />
          <Tab.Screen name="SignIn" component={SignInScreen} 
                                        options={
                                          {
                                            tabBarIcon: ({focused}) =>{
                                              return(
                                                <Image source={signinIcon} />
                                              )
                                            }
                                          }
                                        }
          />
          <Tab.Screen name="Overhear" component={OverhearScreen} 
                    options={
                      {
                        tabBarIcon: ({focused}) =>{
                          return(
                            <Image source={mapIcon} />
                          )
                        }
                      }
                    }/>
          <Tab.Screen name="Library" component={LibraryScreen} 
                    options={
                      {
                        tabBarIcon: ({focused}) =>{
                          return(
                            <Image source={libraryIcon} />
                          )
                        }
                      }
                    }
          />
          <Tab.Screen name="Tutorials" component={TutorialScreen} 
                                        options={
                                          {
                                            tabBarIcon: ({focused}) =>{
                                              return(
                                                <Image source={tutorialIcon} />
                                              )
                                            }
                                          }
                                        }
          />
          
          <Tab.Screen name="Settings" component={SettingScreen} 
                              options={
                                {
                                  tabBarIcon: ({focused}) =>{
                                    return(
                                      <Image source={settingsIcon} />
                                    )
                                  }
                                }
                              }
          />
          <Tab.Screen name="Test" component={TestScreen} 
                    options={
                      {
                        tabBarIcon: ({focused}) =>{
                          return(
                            <Image source={mailIcon} />
                          )
                        }
                      }
                    }
          />

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
