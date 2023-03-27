// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./TutorialScreen\"\n"
//   skip: 
// ---

import React, { FC, useState, useRef } from "react"
import { observer } from "mobx-react-lite"
import { View, ViewStyle, Image, ImageStyle, TextStyle, TextInput, StyleSheet, Button, Form, Alert} from "react-native"
import { StackScreenProps } from "@react-navigation/stack"
import { AppStackScreenProps } from "../navigators"
import { Screen, Text } from "../components"

import { colors, spacing } from "../theme"
import { isRTL } from "../i18n"
import { useSafeAreaInsetsStyle } from "../utils/useSafeAreaInsetsStyle"

// import {Carousel} from '../components';

import {SafeAreaView} from 'react-native';

// Carousel Dependencies
import { Dimensions} from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const tutorialPage1 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial1.png")
const tutorialPage2 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial2.png")
const tutorialPage3 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial3.png")
const tutorialPage4 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial4.png")
const tutorialPage5 = require("../../assets/overhear-assets/images/tutorial-screens/user-walkthrough/tutorial5.png")

const wanderPage1 = require("../../assets/overhear-assets/images/tutorial-screens/wander-walkthrough/wander1.png")
const wanderPage2 = require("../../assets/overhear-assets/images/tutorial-screens/wander-walkthrough/wander2.png")
const wanderPage3 = require("../../assets/overhear-assets/images/tutorial-screens/wander-walkthrough/wander3.png")
const wanderPage4 = require("../../assets/overhear-assets/images/tutorial-screens/wander-walkthrough/wander4.png")
const wanderPage5 = require("../../assets/overhear-assets/images/tutorial-screens/wander-walkthrough/wander5.png")

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

const images: string[] = [
  tutorialPage1,
  tutorialPage2,
  tutorialPage3,
  tutorialPage4,
  tutorialPage5,  
  wanderPage1,
  wanderPage2,
  wanderPage3,
  wanderPage4,
  wanderPage5
];

const {width, height} = Dimensions.get('screen');

// REFERENCE - https://reactnavigation.org/docs/screen/
export const TutorialScreen: FC<StackScreenProps<AppStackScreenProps, "Tutorial">> = observer(function TutorialScreen() {
  // Pull in one of our MST stores
  // const { someStore, anotherStore } = useStores()

  // Pull in navigation via hook
  // const navigation = useNavigation()
  return (
    <Screen style={{$root,  flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <View style={{ flex: 1 }}>
            <Carousel
                loop
                width={width}
                height={width / 2}
                autoPlay={true}
                data={images}
                scrollAnimationDuration={1000}
                onSnapToItem={(index) => console.log('current index:', index)}
                renderItem={({index}) => (
                    <View
                        style={{
                            flex: 1,
                            borderWidth: 1,
                            justifyContent: 'center'
                        }}
                    >
                    <Image style={$tutorialScreenGenericStyle} source={images[index]} resizeMode="contain" />
                        {/* <Text style={{ textAlign: 'center', fontSize: 30 }}>
                            {index}
                        </Text> */}
                    </View>
                )}
            />
        </View>
    </Screen>
  )
})

const $root: ViewStyle = {
  flex: 1,
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  flatList: {flexGrow: 0},
  imageContainer: {
    width,
    height: 500,
    alignItems: 'center',
    justifyContent: 'center',
  },
  image: {
    height: 300,
    width: width - 150,
    borderRadius: 20,
    resizeMode: 'cover',
  },
});

const $tutorialScreenGenericStyle: ImageStyle = {
  borderRadius: 20,
  flex:1,
  resizeMode: 'center', 
}