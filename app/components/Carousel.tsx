import React, {FunctionComponent, useRef} from 'react';
import {
  FlatList,
  View,
  StyleSheet,
  Dimensions,
  Image,
  Animated,
} from 'react-native';

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

const Carousel: FunctionComponent = () => {
  const xScroll = useRef(new Animated.Value(0)).current;

  return (
    <View style={style.container}>
      <Animated.FlatList
        style={style.flatList}
        data={images}
        horizontal
        showsHorizontalScrollIndicator={false}
        snapToInterval={width}
        decelerationRate={'fast'}
        keyExtractor={(_, index) => index.toString()}
        onScroll={Animated.event(
          [{nativeEvent: {contentOffset: {x: xScroll}}}],
          {useNativeDriver: true},
        )}
        renderItem={({item, index}) => {
          const inputRange = [
            (index - 1) * width,
            index * width,
            (index + 1) * width,
          ];
          const outputRange = ['-90deg', '0deg', '90deg'];

          const translateX = xScroll.interpolate({inputRange, outputRange});

          return (
            <View style={style.imageContainer}>
              <Animated.Image
                style={[style.image, {transform: [{rotateZ: translateX}]}]}
                source={{uri: item}}
              />
            </View>
          );
        }}
      />
    </View>
  );
};

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

export default Carousel;