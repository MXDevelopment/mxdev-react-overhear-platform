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

export type AppStackParamList = {
  TabNavigator: undefined;
  Tutorial: undefined;
};

export type AppStackScreenProps<T extends keyof AppStackParamList> = StackScreenProps<AppStackParamList, T>;

const exitRoutes = Config.exitRoutes;

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
