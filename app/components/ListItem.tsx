import * as React from "react";
import { StyleProp, ViewStyle, StyleSheet, View, ImageBackground, Text, Pressable } from "react-native";
import { typography } from "../theme";

type ItemsType = {
  style?: StyleProp<ViewStyle>;
  title: string;
  author: string;
};

export const ListItem = ({ style, title, author }: ItemsType) => {
  const [isExpanded, setExpanded] = React.useState(false);

  const handlePress = () => {
    setExpanded(!isExpanded);
  };

  return (
    <View style={isExpanded ? styles.itemExpanded : styles.item}>
      <View style={styles.row}>
        <View style={styles.logoContainer}>
          <ImageBackground
            style={styles.logoDark1Icon}
            resizeMode="cover"
            source={require("../../assets/overhear-assets/images/logodark-1.png")}
          />
        </View>
        <View style={styles.text}>
          <Text style={styles.title}>{title}</Text>
          <Text style={styles.author}>{author}</Text>
        </View>
        <Pressable style={styles.chevronContainer} onPress={handlePress}>
          <ImageBackground
            style={[styles.chevronStrokeIcon, isExpanded ? styles.rotated: {}]}
            resizeMode="cover"
            source={require("../../assets/overhear-assets/images/chevron-stroke2.png")}
          />
        </Pressable>
        <View style={styles.playpauseContainer}>
          <ImageBackground
            style={styles.playpauseContainerChild}
            resizeMode="cover"
            source={require("../../assets/overhear-assets/images/polygon-2.png")}
          />
        </View>
      </View>
      {isExpanded && (
        <View style={styles.expanded}>
          <Text style={styles.description}>Description:</Text>
          <Text style={styles.descriptionText}>Description of the Recording</Text>
          <Text style={styles.description}>Bio</Text>
          <Text style={styles.descriptionText}>Bio of the Author</Text>
        </View>
      )}
    </View>
  );
};



const styles = StyleSheet.create({
  logoDark1Icon: {
    width: 42,
    height: 59,
  },
  logoContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 16,
    fontWeight: "500",
    fontFamily: typography.custom.normal,
    color: "#000",
  },
  author: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: typography.custom.normal,
    color: "#000",
  },
  text: {
    flex: 3,
    justifyContent: 'center',
    paddingHorizontal: 8,
  },
  chevronStrokeIcon: {
    width: 52,
    height: 10,
  },
  chevronContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  playpauseContainerChild: {
    width: 31,
    height: 36,
  },
  playpauseContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  expanded: {
    padding: 8,
  },
  description: {
    fontSize: 14,
    fontWeight: "500",
    fontFamily: typography.custom.normal,
    color: "#000",
  },
  descriptionText: {
    fontSize: 14,
    fontWeight: "300",
    fontFamily: typography.custom.normal,
    color: "#000",
  },
  item: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#2f5ca6",
  },
  itemExpanded: {
    flex: 1,
    justifyContent: 'flex-start',
    backgroundColor: "#2f5ca6",
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 8,
  },
  rotated: {
    transform: [{ rotate: '180deg' }],
  },
});
