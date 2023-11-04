// Import statements
import React, { FC, useState } from "react";
import { observer } from "mobx-react-lite";
import {
  View,
  ViewStyle,
  Image,
  ImageStyle,
  TextStyle,
  TextInput,
  StyleSheet,
  TouchableOpacity,
  Text as RNText
} from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackParamList } from "../navigators";  // Assuming AppStackParamList is correctly exported from your navigators file
import { Screen, Text } from "../components";
import { typography } from '../theme/typography';
import { colors, spacing } from "../theme";
import { isRTL } from "../i18n";
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle";

// Asset imports
const welcomeFace = require("../../assets/overhear-assets/images/polygon-21.png");
const welcomeLogo = require("../../assets/overhear-assets/images/ovhlogoartboard12x15.png");

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `SignIn: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="SignIn" component={SignInScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

// Component definition
export const SignInScreen: FC<NativeStackScreenProps<AppStackParamList, "SignIn">> = observer(function SignInScreen() {

    // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()

  
  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"]);

  return (
    <Screen style={{ ...$root, flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <View style={$container}>
        <View style={$topContainer}>
          <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
          <Text
            testID="signin-title"
            style={$signInTitle}
            tx="signInScreen.topTitle"  // Ensure these translation keys are correctly defined
            preset="heading"
          />
          <Text tx="signInScreen.optionMessage" style={$subHeadingStyle} preset="subheading" />
        </View>

        <View style={[$bottomContainer, $bottomContainerInsets]}>
          <TextInput
            style={inputStyleSheet.usernameFieldStyle}
            onChangeText={onChangeUsername}
            value={username}
            placeholder="Email"
          />
          <TextInput
            style={inputStyleSheet.passwordFieldStyle}
            onChangeText={onChangePassword}
            value={password}
            placeholder="Password"
          />
          <TouchableOpacity
            style={inputStyleSheet.submitButtonStyle}
            onPress={() => { /* handle press */ }}
          >
            <RNText style={{ color: '#841584' }}>Login</RNText>
          </TouchableOpacity>
          <Text
            tx="signInScreen.resetDetailsMessage"
            style={$resetPromptStyle}
          />
        </View>

      </View>
    </Screen>
  );
});

// Styles definition
const $root: ViewStyle = { flex: 1 };

const inputStyleSheet = StyleSheet.create({
  usernameFieldStyle: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center'
  },
  passwordFieldStyle: {
    height: 40,
    borderWidth: 1,
    padding: 10,
    textAlign: 'center'
  },
  submitButtonStyle: {
    justifyContent: "center",
    backgroundColor: colors.palette.neutral100,
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
});

const $container: ViewStyle = {
  flex: 1,
  width: 300,
  backgroundColor: colors.background,
};

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "center",
  paddingHorizontal: spacing.lg,  // Updated the spacing values
};

const $bottomContainer: ViewStyle = {
  marginBottom: 70,
  flexBasis: "40%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  paddingHorizontal: spacing.lg,  // Updated the spacing values
  justifyContent: "space-around"
};

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginTop: spacing.lg,  // Updated the spacing values
  marginBottom: spacing.md,  // Updated the spacing values
};

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
};

const $signInTitle: TextStyle = {
  marginBottom: spacing.md,  // Updated the spacing values
  fontFamily: typography.fonts.spaceGrotesk.normal,  // Updated the typography values
  textAlign: 'center'
};

const $subHeadingStyle: TextStyle = {
  fontFamily: typography.fonts.spaceGrotesk.normal,  // Updated the typography values
  textAlign: 'center'
};

const $resetPromptStyle: TextStyle = {
  fontFamily: typography.fonts.spaceGrotesk.normal,  // Updated the typography values
  textAlign: 'center'
};

