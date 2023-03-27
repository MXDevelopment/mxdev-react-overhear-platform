// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./TutorialScreen\"\n"
//   skip: 
// ---

import React, { FC, useState } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, ImageStyle, TextStyle, TextInput, StyleSheet, Button, Form, Alert} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"

import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

const welcomeFace = require("../../assets/overhear-assets/images/polygon-21.png")

const welcomeLogo = require("../../assets/overhear-assets/images/ovhlogoartboard12x15.png")

const tutorialPage1 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial1.png")
const tutorialPage2 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial2.png")
const tutorialPage3 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial3.png")
const tutorialPage4 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial4.png")
const tutorialPage5 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial5.png")

const wanderPage1 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/wander1.png")
const wanderPage2 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/wander2.png")
const wanderPage3 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/wander3.png")
const wanderPage4 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/wander4.png")
const wanderPage5 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/wander5.png")

// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Tutorial: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Tutorial" component={TutorialScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore

// REFERENCE - https://reactnavigation.org/docs/screen/
export const TutorialScreen: FC<StackScreenProps<AppStackScreenProps, "Tutorial">> = observer(function TutorialScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={{$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            {/* <View style={color: 'red'}></View>
            <View style={color:'blue'}></View> */}
        <Text>Tutorial!</Text>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
