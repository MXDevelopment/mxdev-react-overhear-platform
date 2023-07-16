/**
 * The app navigator (formerly "AppNavigator" and "MainNavigator") is used for the primary
 * navigation flows of your app.
 * Generally speaking, it will contain an auth flow (registration, login, forgot password)
 * and a "main" flow which the user will use once logged in.
 */
import React, { useEffect, useState } from "react";
import { useColorScheme } from "react-native";
import { DarkTheme, DefaultTheme, NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import { observer } from "mobx-react-lite";
import { StackScreenProps } from "@react-navigation/stack";
import AsyncStorage from '@react-native-async-storage/async-storage';

import Config from "../config";
import { TutorialScreen } from "../screens/TutorialScreen";
import TabNavigator from "./TabNavigator";

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
  TabNavigator: undefined;
  Tutorial: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>;

const exitRoutes = Config.exitRoutes;

// Documentation: https://reactnavigation.org/docs/stack-navigator/
const Stack = createNativeStackNavigator<AppStackParamList>();

interface NavigationProps extends Partial<React.ComponentProps<typeof NavigationContainer>> {}

export const AppNavigator: React.FC<NavigationProps> = observer(function AppNavigator(props: NavigationProps) {
  const colorScheme = useColorScheme();
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
    <NavigationContainer theme={colorScheme === "dark" ? DarkTheme : DefaultTheme} {...props}>
      <Stack.Navigator
        initialRouteName={initialRouteName}
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="Tutorial" component={TutorialScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  );
});
