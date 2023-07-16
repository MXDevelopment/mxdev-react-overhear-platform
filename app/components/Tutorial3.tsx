import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
  Pressable,
} from "react-native";
import { typography } from '../theme/typography'


export const Tutorial3 = () => {


  return (
    <View>
      <View style={styles.statusBar} />
      <View style={styles.content}>
        <View style={styles.textContainer}>
          <Text style={[styles.auto, styles.autoTypo]}>auto</Text>
          <Text style={[styles.collect, styles.autoTypo]}>COLLECT</Text>
          <Text style={[styles.whenInRange, styles.autoTypo]}>
            when in range
          </Text>
        </View>
        <View style={styles.mapImageContainer}>
          <ImageBackground
            style={styles.autoCollectIcon}
            resizeMode="contain"
            source={require("../../assets/overhear-assets/images/autocollect.png")}
          />
        </View>
      </View>
    </View>
    
  );
};

const styles = StyleSheet.create({
  autoTypo: {
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    position: "absolute",
  },
  statusBar: {
    height: 51,
    alignSelf: "stretch",
    backgroundColor: "#214176",
  },
  auto: {
    top: 0,
    width: 117,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    position: "absolute",
    left: 0,
  },
  collect: {
    top: 28,
    fontSize: 40,
    display: "flex",
    justifyContent: "center",
    width: 308,
    left: 0,
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    position: "absolute",
    alignItems: "center",
  },
  whenInRange: {
    top: 75,
    left: 96,
    width: 212,
    fontSize: 20,
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    position: "absolute",
  },
  textContainer: {
    height: 95,
    alignSelf: "stretch",
  },
  autoCollectIcon: {
    height: 383,
    width: 308,
    marginVertical: 20,
  },
  mapImageContainer: {
    alignSelf: "stretch",
    flex: 1,
  },
  content: {
    paddingHorizontal: 24,
    paddingBottom: 50,
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  tutorial3: {
    width: "100%",
    height: 667,
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#214176",
  },
});

export default Tutorial3;
