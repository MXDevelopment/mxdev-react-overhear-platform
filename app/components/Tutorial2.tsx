import * as React from "react";
import {
  Text,
  StyleSheet,
  ImageBackground,
  View,
} from "react-native";
import { typography } from '../theme/typography'


export const Tutorial2 = () => {


  return (
    <View style={styles.tutorial9}>
      <View style={[styles.content, styles.walkerFlexBox]}>
        <View style={[styles.movewalker, styles.walkerFlexBox]}>
          <Text style={[styles.move, styles.moveFlexBox]}>MOVE</Text>
          <View style={[styles.walkerImageContainer, styles.walkerFlexBox]}>
            <ImageBackground
              style={styles.walkerFlexBox}
              resizeMode="contain"
              source={require("../../assets/overhear-assets/images/walker.png")}
            />
          </View>
        </View>
        <View style={styles.textContainer}>
        <Text
          style={[styles.overhearWorkOnContainer, styles.moveFlexBox]}
          numberOfLines={2}
        >
            Overhear works on location!{'\n'}Head to a pin on the Map.
          </Text>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  walkerFlexBox: {
    alignSelf: "stretch",
    flex: 1,
  },
  moveFlexBox: {
    display: "flex",
    textAlign: "center",
    color: "#fff",
    fontFamily: typography.custom.normal,
    alignItems: "center",
    
  },
  move: {
    fontSize: 40,
    justifyContent: "center",
    width: 124,
  },
  walkerImageContainer: {
    marginLeft: -19,
    alignItems: "center",
  },
  movewalker: {
    flexDirection: "row",
    alignItems: "center",
  },
  overhearWorkOnContainer1: {
    textAlign: "center",
    
  },
  overhearWorkOnContainer: {
    fontSize: 20,
    height: 50,
    marginTop: 57,
  },
  textContainer: {
    flex: .2,
    paddingBottom: 50,
    justifyContent: "center",
    alignItems: "center",
  },
  
  content: {
    paddingLeft: 24,
    paddingRight: 11,
    paddingBottom: 50,
    zIndex: 0,
    alignItems: "center",
  },
  tutorial9: {
    backgroundColor: "#214176",
    width: "100%",
    height: "100%",
    paddingBottom: 10,
    alignItems: "center",
    flex: 1,
  },
});


export default Tutorial2;
