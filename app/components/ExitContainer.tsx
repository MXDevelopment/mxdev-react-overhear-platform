import * as React from "react";
import { Pressable, StyleSheet, View, ImageSourcePropType } from "react-native";
import { Image } from "expo-image";
import { useNavigation } from "@react-navigation/native";

type ExitContainerType = {
  icon?: ImageSourcePropType;
};

const ExitContainer = ({
  icon = { uri: "exit-cross@3x.png" },
}: ExitContainerType) => {
  const navigation = useNavigation();

  return (
    <View style={styles.exitContainer}>
      <Pressable
        style={styles.exitCross}
        onPress={() => navigation.navigate("LoginOptionsPage")}
      >
        <Image style={styles.icon} contentFit="cover" source={icon} />
      </Pressable>
    </View>
  );
};

const styles = StyleSheet.create({
  icon: {
    width: "100%",
    height: "100%",
  },
  exitCross: {
    width: 23,
    height: 22,
  },
  exitContainer: {
    alignSelf: "stretch",
    flexDirection: "row",
    paddingRight: 14,
    justifyContent: "flex-end",
  },
});

export default ExitContainer;
