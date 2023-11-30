
import React, { useState, useRef } from "react";
import { View, Image, StyleSheet, FlatList, TouchableOpacity, Dimensions, ViewToken } from "react-native";
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import Tutorial1 from "../components/Tutorial1";
import Tutorial2 from "../components/Tutorial2";
import Tutorial3 from "../components/Tutorial3";
import Tutorial4 from "../components/Tutorial4";
import Tutorial5 from "../components/Tutorial5";
import { AppStackParamList } from "../navigators/AppNavigator";
import { CommonActions } from "@react-navigation/native";


type TutorialScreenProps = NativeStackScreenProps<AppStackParamList, "Tutorial">;

export const TutorialScreen: React.FC<TutorialScreenProps> = ({ navigation }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onViewRef = useRef(({ viewableItems }: { viewableItems: ViewToken[]; changed: ViewToken[] }) => {
    const newIndex = viewableItems[0]?.index; // Use optional chaining
    if (typeof newIndex === 'number') {
      setActiveIndex(newIndex);
    }
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
  const viewConfigRef = useRef({
    viewAreaCoveragePercentThreshold: 50 // or any other configuration you need
  });
  
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
