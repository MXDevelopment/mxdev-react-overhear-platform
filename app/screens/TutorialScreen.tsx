// ---
// patch:
//   path: "app/screens/index.ts"
//   append: "export * from \"./TutorialScreen\"\n"
//   skip: 
// ---

import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions } from "react-native";
import { StackScreenProps } from '@react-navigation/stack';
import Tutorial1 from "../components/Tutorial1";
import Tutorial2 from "../components/Tutorial2";
import Tutorial3 from "../components/Tutorial3";
import Tutorial4 from "../components/Tutorial4";
import Tutorial5 from "../components/Tutorial5";
import { AppStackParamList } from "../navigators/AppNavigator";
import { CommonActions } from "@react-navigation/native";

const TutorialsData = [
  { id: '1', Component: Tutorial1 },
  { id: '2', Component: Tutorial2 },
  { id: '3', Component: Tutorial3 },
  { id: '4', Component: Tutorial4 },
  { id: '5', Component: Tutorial5 },
];

type TutorialScreenProps = StackScreenProps<AppStackParamList, "Tutorial">;

export const TutorialScreen: React.FC<TutorialScreenProps> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  const onViewRef = useRef((viewableItems) => {
    setActiveIndex(viewableItems.changed[0].index);
  });

  const handleExitTutorial = () => {
    navigation.dispatch(
      CommonActions.reset({
        index: 0,
        routes: [
          { name: "TabNavigator" },
        ],
      })
    );
  };

  const tutorials = [<Tutorial1 />, <Tutorial2 />, <Tutorial3 />, <Tutorial4 />, <Tutorial5 />];

  const renderItem = ({ item }: { item: React.ReactNode }) => ( // Specify the type of 'item' as React.ReactNode
    <View style={{ width: Dimensions.get('window').width }}>
      {item}
    </View>
  );

  const renderExitCross = () => (
    <TouchableOpacity style={styles.exitCrossContainer} onPress={handleExitTutorial}>
      <Image source={require("../../assets/overhear-assets/images/exit-cross5.png")} 
      style={styles.exitCrossImage}
      resizeMode="contain"/>
    </TouchableOpacity>
  );

  const renderDots = () => {
    return (
      <View style={styles.dotsContainer}>
        {tutorials.map((_, i) => {
          let backgroundColor = activeIndex === i ? '#FFFFFF' : '#D3D3D3';
          return <View key={i} style={[styles.dot, {backgroundColor}]} />
        })}
      </View>
    );
  };

  return (
    <View style={styles.tutorialContainer}>
      {renderExitCross()}
      <FlatList 
        style={{ flex: 1, backgroundColor: '#214176' }}
        data={tutorials}
        horizontal
        pagingEnabled
        showsHorizontalScrollIndicator={false}
        keyExtractor={(_, index) => 'tutorial-' + index}
        renderItem={renderItem}
        onViewableItemsChanged={onViewRef.current}
        viewabilityConfig={viewConfigRef.current}
      />
      {renderDots()}
    </View>
  );
};
const styles = StyleSheet.create({
  tutorialContainer: {
    flex: 1,
    height: '100%',
  },
  exitCrossContainer: {
    position: 'absolute',
    top: 25,
    right: 20,
    zIndex: 1,
  },
  exitCrossImage: {
    width: 30, 
    height: 30,
  },
  dotsContainer: {
    position: 'absolute',
    bottom: 20,
    flexDirection: 'row',
    alignSelf: 'center',
  },
  dot: {
    height: 10,
    width: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
});
