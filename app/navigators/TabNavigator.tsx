import React from "react";
import { Image } from "react-native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";

import { WelcomeScreen } from "../screens/WelcomeScreen";
import { OverhearScreen } from "../screens/OverhearScreen";
import { LibraryScreen } from "../screens/LibraryScreen";
import { SettingScreen } from "../screens/SettingScreen";
import { TestScreen } from "../screens/TestScreen";
import { SignInScreen } from "../screens/SignInScreen";

const libraryIcon = require("../screens/anima-imports/images/library-24-20-px.png");
const mapIcon = require("../screens/anima-imports/images/map-icon-22-20-px.png");
const wanderIcon = require("../screens/anima-imports/images/wander-20-22-px.png");
const mailIcon = require("../screens/anima-imports/images/mail-20px.png");
const settingsIcon = require("../screens/anima-imports/images/icons8-services-24.png");
const signinIcon = require("../screens/anima-imports/images/icons8-guardian-24.png");

export type NavigatorParamList = {
  Welcome: undefined;
  SignIn: undefined;
  Overhear: undefined;
  Library: undefined;
  Setting: undefined;
  Test: undefined;
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
          showIcon: true,
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
        name="SignIn"
        component={SignInScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={signinIcon} />;
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
        name="Setting"
        component={SettingScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={settingsIcon} />;
          },
        }}
      />
      <Tab.Screen
        name="Test"
        component={TestScreen}
        options={{
          tabBarIcon: ({ focused }) => {
            return <Image source={mailIcon} />;
          },
        }}
      />
    </Tab.Navigator>
  );
};

export default TabNavigator;
