// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./SignInScreen\"\n"
//   skip: 
// ---

import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, ImageStyle, TextStyle} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"

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

function LoginForm() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  const handleUsernameChange = (event) => {
    setUsername(event.target.value);
  };

  const handlePasswordChange = (event) => {
    setPassword(event.target.value);
  };

  const handleLogin = (event) => {
    event.preventDefault();
    // TODO: Handle login logic
  };

export const SignInScreen: FC<StackScreenProps<AppStackScreenProps, "SignIn">> = observer(function SignInScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  const $bottomContainerInsets = useSafeAreaInsetsStyle(["bottom"])

  return (
    <Screen style={{$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <View style={$container}>
              <View style={$topContainer}>
                <Image style={$welcomeLogo} source={welcomeLogo} resizeMode="contain" />
                <Text
                  testID="signin-title"
                  style={$signInTitle}
                  tx="signInScreen.subHeading"
                  preset="heading"
                />
                <Text tx="signInScreen.optionMessage" style={$subHeadingStyle} preset="subheading" />
              </View>

              <View style={[$bottomContainer, $bottomContainerInsets]}>
              <form onSubmit={handleLogin}>
                <label>
                  Username:
                  <input type="text" value={username} onChange={handleUsernameChange} />
                </label>
                <br />
                <label>
                  Password:
                  <input type="password" value={password} onChange={handlePasswordChange} />
                </label>
                <br />
                <button type="submit">Login</button>
                <br />
                <div>
                  <button>Log in with Google</button>
                  <button>Log in with Facebook</button>
                </div>
              </form>
              </View>
            </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const $container: ViewStyle = {
  flex: 1,
  backgroundColor: colors.background,
}

const $topContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 1,
  flexBasis: "57%",
  justifyContent: "center",
  paddingHorizontal: spacing.large,
}

const $bottomContainer: ViewStyle = {
  flexShrink: 1,
  flexGrow: 0,
  flexBasis: "43%",
  backgroundColor: colors.palette.neutral100,
  borderTopLeftRadius: 16,
  borderTopRightRadius: 16,
  paddingHorizontal: spacing.large,
  justifyContent: "space-around",
}
const $welcomeLogo: ImageStyle = {
  height: 88,
  width: "100%",
  marginBottom: spacing.huge,
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
  fontFamily: 'Sifonn',
  textAlign: 'center'
}

const $subHeadingStyle: TextStyle ={
  fontFamily: 'Sifonn',
  textAlign: 'center'
}