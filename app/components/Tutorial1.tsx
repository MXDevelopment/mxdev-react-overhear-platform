import * as React from "react";
import { StyleSheet, View, ImageBackground, Text } from "react-native";
import { typography } from '../theme/typography'

export const Tutorial1 = () => {


  return (
    <View style={styles.tutorial1}>
      <View style={styles.background}>
        <View style={styles.content}>
          <ImageBackground
            style={styles.ovhLogoartboard12x1}
            resizeMode="cover"
            source={require("../../assets/overhear-assets/images/ovhlogoartboard12x1.png")}
          />
          <Text style={[styles.welcomeToOverhear, styles.swipeToStartFlexBox]}>
            Welcome to 
          </Text>
          <Text style={[styles.welcomeToOverhear, styles.Overhear]}>
          OVERHEAR
          </Text>
          <Text style={[styles.swipeToStart, styles.swipeToStartFlexBox]}>
            Swipe to start tutorial
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  contentFlexBox: {
    justifyContent: "space-between",
    alignSelf: "stretch",
    alignItems: "center",
    flex: 1,
  },
  Overhear: {
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.outline,
    alignSelf: "stretch",
    paddingVertical: 10,
  },
  swipeToStartFlexBox: {
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    alignSelf: "stretch",
  },
  ovhLogoartboard12x1: {
    width: 186,
    height: 251,
    marginBottom: 20, 
  },
  welcomeToOverhear: {
    fontSize: 40,
  },
  swipeToStart: {
    fontSize: 20,
  },
  background: {
    flex: 1,
    backgroundColor: "transparent",
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingBottom: 50,
    backgroundColor: "#214176",
    alignItems: "center",
    justifyContent: "center",
  },
  tutorial1: {
    flex: 1,
  },
});

export default Tutorial1;
