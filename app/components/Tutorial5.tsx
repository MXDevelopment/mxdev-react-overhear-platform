import * as React from "react";
import {
  StyleSheet,
  View,
  Text,
  ImageBackground,
} from "react-native";
import { typography } from '../theme/typography'


export const Tutorial5 = () => {


  return (
    <View>
      <View style={styles.statusBar} />
      <View style={[styles.tutorial51,]}>
        <Text style={styles.takeTimeTo}>Take time to</Text>
        <Text style={[styles.pause, styles.pauseFlexBox]}>PAUSE</Text>
        <View style={styles.pauseImageContainer}>
          <ImageBackground
            style={styles.pauseIcon}
            resizeMode="cover"
            source={require("../../assets/overhear-assets/images/pause.png")}
          />
        </View>
        <Text style={[styles.reflectOnThe, styles.relectFlexBox]}>
          Reflect on the words inspired by the place in which you are now
          standing
        </Text>
      </View>
      </View>
  );
};

const styles = StyleSheet.create({

  pauseFlexBox: {
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.outline,
    alignSelf: "stretch",
    marginVertical: 50,
  },
  relectFlexBox: {
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    alignSelf: "stretch",
    marginVertical: 70,
  },
  statusBar: {
    height: 51,
    alignSelf: "stretch",
    backgroundColor: "#214176",
  },
  takeTimeTo: {
    textAlign: "left",
    height: 22,
    color: "#fff",
    fontFamily: typography.custom.normal,
    fontSize: 20,
    alignSelf: "stretch",
    marginTop: 20,
  },
  pause: {
    fontSize: 75,
  },
  pauseIcon: {
    width: 170,
    height: 168,
  },
  pauseImageContainer: {
    height: 145,
    justifyContent: "center",
    alignSelf: "stretch",
    alignItems: "center",
  },
  reflectOnThe: {
    height: 77,
    fontSize: 20,
    textAlign: "center",
  },
  tutorial51: {
    paddingHorizontal: 24,
    paddingBottom: 50,
  },
  tutorial5: {
    width: "100%",
    height: "100%",
    paddingHorizontal: 0,
    paddingVertical: 10,
    alignItems: "center",
    flex: 1,
    backgroundColor: "#214176",
  },
});

export default Tutorial5;
