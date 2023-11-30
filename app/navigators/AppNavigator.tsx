import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator, NativeStackScreenProps } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import AsyncStorage from '@react-native-async-storage/async-storage';
import Config from "../config";
import * as Screens from "app/screens";
import TabNavigator from "./TabNavigator";
import { navigationRef, useBackButtonHandler } from "./navigationUtilities";

export type AppStackParamList = {
  TabNavigator: undefined;
  Tutorial: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Welcome: undefined;
  Library: undefined;
  Overhear: undefined;
  Settings: undefined;

};

const exitRoutes = Config.exitRoutes;

export type AppStackScreenProps<T extends keyof AppStackParamList> = NativeStackScreenProps<AppStackParamList, T>;

const Stack = createNativeStackNavigator<AppStackParamList>();

const AppStack = observer(function AppStack() {
  const [initialRouteName, setInitialRouteName] = useState<keyof AppStackParamList | null>(null); // Default value

  useEffect(() => {
    const checkFirstLaunch = async () => {
      try {
        const firstLaunch = await AsyncStorage.getItem("firstLaunch");
        if (firstLaunch === null) {
          await AsyncStorage.setItem("firstLaunch", "true");
          setInitialRouteName("Tutorial");
        } else {
          setInitialRouteName("TabNavigator");
        }
      } catch (error) {
        console.log("Error retrieving firstLaunch value from AsyncStorage: ", error);
        setInitialRouteName("TabNavigator"); // default to TabNavigator in case of error
      }
    };

    checkFirstLaunch();
  }, []);

  if (initialRouteName === null) {
    return null; // Or return a loading spinner
  }

  return (
    <Stack.Navigator
  initialRouteName={initialRouteName}
  screenOptions={{
    headerShown: false,
  }}
>
  <Stack.Screen name="Tutorial" component={Screens.TutorialScreen} />
  <Stack.Screen name="TabNavigator" component={TabNavigator} />
  <Stack.Screen name="LogIn"component={Screens.LoginScreen}/>
  <Stack.Screen name="SignUp"component={Screens.SignUpScreen}/>
</Stack.Navigator>
  );
});

export interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();

  useBackButtonHandler((routeName) => exitRoutes.includes(routeName));

  return (
    <NavigationContainer
      ref={navigationRef}
      theme={colorScheme === "dark" ? DarkTheme : DefaultTheme}
      {...props}
    >
      <AppStack />
    </NavigationContainer>
  );
});
