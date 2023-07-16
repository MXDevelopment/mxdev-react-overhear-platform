// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./SignInScreen\"\n"
//   skip: 
// ---

import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, ImageStyle, TextStyle, TextInput, StyleSheet, Button, Alert} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import { typography } from '../theme/typography'
import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeFace = require("../../assets/overhear-assets/images/polygon-21.png")

const welcomeLogo = require("../../assets/overhear-assets/images/ovhlogoartboard12x15.png")

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


export const SignInScreen: FC<StackScreenProps<AppStackScreenProps, "SignIn">> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()
  // Pull in navigation via hook
  // const navigation = useNavigation()

  const [username, onChangeUsername] = React.useState('');
  const [password, onChangePassword] = React.useState('');

  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen style={{$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={$container}>
              <View style={$topContainer}>
                <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
                <Text
                  testID="signin-title"
                  style={$signInTitle}
                  tx="signInScreen.topTitle"
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
                    <Button
                      title="Login"
                      color='#F4F2F1'
                      style={inputStyleSheet.submitButtonStyle}
                      margin= {'10px 30px'}
                    />
                    <Text
                      tx = "signInScreen.resetDetailsMessage"
                      style= {$resetPromptStyle}
                    />
                    {/* <Button
                      title="Sign Up"
                      color='#F4F2F1'
                      style={inputStyleSheet.registerButtonStyle}
                      margin= {'10px 30px'}
                    /> */}
              </View>
              
            </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const inputStyleSheet= StyleSheet.create({
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
  submitButtonStyle:{
    justifyContent: "center",
    color: '#841584',
    backgroundColor: colors.palette.neutral100
  },
  registerButtonStyle:{
    justifyContent: "center",
    backgroundColor: colors.palette.neutral100
  },
});

const $container: ViewStyle = {
  flex: 1,
  width: 300,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "50%",
  justifyContent: "center",
  // marginTop: 20,
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  marginBottom: 70,
  flexBasis: "40%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  borderBottomLeftRadius: 16,
  borderBottomRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around"
}

const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginTop: spacing.large,
  marginBottom: spacing.medium
}

const $welcomeFace: ImageStyle = {
  height: 169,
  width: 269,
  position: "absolute",
  bottom: -47,
  right: -80,
  transform: [{ scaleX: isRTL ? -1 : 1 }],
}
 
const $signInTitle: TextStyle = {
  marginBottom: spacing.medium,
  fontFamily: typography.custom.normal,
  textAlign: 'center'
}

const $subHeadingStyle: TextStyle ={
  fontFamily: typography.custom.normal,
  textAlign: 'center'
}

const $resetPromptStyle: TextStyle ={
  fontFamily: typography.custom.normal,
  textAlign: 'center'
}