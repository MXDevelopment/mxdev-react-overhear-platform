import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { WelcomeScreen } from "../screens/WelcomeScreen";
import { OverhearScreen } from "../screens/OverhearScreen";
import { LibraryScreen } from "../screens/LibraryScreen";
import { SettingScreen } from "../screens/SettingScreen";


const libraryIcon = require("../screens/anima-imports/images/library-24-20-px.png");
const mapIcon = require("../screens/anima-imports/images/map-icon-22-20-px.png");
const wanderIcon = require("../screens/anima-imports/images/wander-20-22-px.png");
const settingsIcon = require("../screens/anima-imports/images/icons8-services-24.png");

export type NavigatorParamList = {
  Welcome: undefined;
  LogIn: undefined;
  SignUp: undefined;
  Overhear: undefined;
  Library: undefined;
  Settings: undefined;
};

const Tab = createBottomTabNavigator<NavigatorParamList>();

const TabNavigator: React.FC = () => {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: "#214176",
          height: 120,
        },
        tabBarStyle: {
          backgroundColor: "#214176",
          flexBasis: "10%",
        },
      }}
      initialRouteName="Welcome"
      backBehavior="history"
    >
      <Tab.Screen
        name="Welcome"
        component={WelcomeScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={wanderIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Overhear"
        component={OverhearScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={mapIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Library"
        component={LibraryScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={libraryIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={settingsIcon} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
