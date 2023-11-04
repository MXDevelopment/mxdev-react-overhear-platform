// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./OverhearScreen\"\n"
//   skip: 
// ---

import React, { FC } from "react"
import { observer } from "mobx-react-lite"
import { ViewStyle } from "react-native"
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"
import MapContainer from "app/components/MapContainer";
// import { useNavigation } from "@react-navigation/native"
// import { useStores } from "../models"

// STOP! READ ME FIRST!
// To fix the TS error below, you'll need to add the following things in your navigation config:
// - Add `Overhear: undefined` to AppStackParamList
// - Import your screen, and add it to the stack:
//     `<Stack.Screen name="Overhear" component={OverhearScreen} />`
// Hint: Look for the 🔥!

// REMOVE ME! ⬇️ This TS ignore will not be necessary after you've added the correct navigator param type
// @ts-ignore
export const OverhearScreen: FC<NativeStackScreenProps<AppStackScreenProps, "Overhear">> = observer(function OverhearScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={{...$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        
        <MapContainer></MapContainer>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}
