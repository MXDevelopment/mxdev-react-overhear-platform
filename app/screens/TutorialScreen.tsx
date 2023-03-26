// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./TutorialScreen\"\n"
//   skip: 
// ---

import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle, View } from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
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
