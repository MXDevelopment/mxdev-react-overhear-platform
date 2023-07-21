import * as React from "react";
import {
  StyleSheet,
  View,
  ImageBackground,
  Text,
} from "react-native";
import { typography } from '../theme/typography'

export const Tutorial4 = () => {


  return (
    <View> 
      <View style={styles.statusBar} />
      <View>
        <ImageBackground
          style={styles.listen1Icon}
          resizeMode="stretch"
          source={require("../../assets/overhear-assets/images/listen1.png")}
        />
        <View
          style={[styles.toWhatYouveFoundByTappinWrapper,]}>
          <Text style={styles.toWhatYouve} numberOfLines={2}>
            ...to what you’ve found by tapping “Library”
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  statusBar: {
    height: 51,
    backgroundColor: "#1d355d",
    alignSelf: "stretch",
  },
  icon: {
    height: "100%",
    width: "100%",
  },
  listen1Icon: {
    width: '100%',
    height: 427,
  },
  toWhatYouve: {
    fontSize: 20,
    fontFamily: typography.custom.normal,
    color: "#fff",
    textAlign: "center",
    flex: 1,
    marginVertical: 20,
  },
  toWhatYouveFoundByTappinWrapper: {
    paddingHorizontal: 32,
    flexDirection: "row",
  },
  tutorial4: {
    backgroundColor: "#214176",
    height: "100%",
    paddingBottom: 10,
    alignItems: "center",
    width: "100%",
    flex: 1,
  },
});

export default Tutorial4;
