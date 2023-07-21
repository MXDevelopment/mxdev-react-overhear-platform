import React, { useState } from 'react';
import { FlatList, StyleSheet, View, Text, Animated } from 'react-native';
import { ListItem } from '../components/ListItem';
import { Swipeable, RectButton } from 'react-native-gesture-handler';

export const LibraryScreen = () => {
  const [itemContainerFlatListData, setItemContainerFlatListData] = useState([
    {title: 'Title 1', author: 'Author 1'},
    {title: 'Title 2', author: 'Author 2'},
    {title: 'Title 2', author: 'Author 3'},
  ]);

  const handleDelete = (index) => {
    const newData = [...itemContainerFlatListData];
    newData.splice(index, 1);
    setItemContainerFlatListData(newData);
  };

  const renderRightAction = (progress, index) => {
    const trans = progress.interpolate({
      inputRange: [0, 1],
      outputRange: [64, 0],
    });
    return (
      <RectButton onPress={() => handleDelete(index)}>
        <Animated.View style={{ flex: 1, transform: [{ translateX: trans }] }}>
          <Text style={styles.deleteButton}>Delete</Text>
        </Animated.View>
      </RectButton>
    );
  };

  const renderItem = ({ item, index }) => {
    return (
      <Swipeable renderRightActions={(progress) => renderRightAction(progress, index)}>
        <ListItem key={index} title={item.title} author={item.author} />
      </Swipeable>
    );
  }

  return (
    <FlatList
      style={styles.listFlexBox}
      data={itemContainerFlatListData}
      renderItem={renderItem}
      keyExtractor={(item, index) => index.toString()}
      showsVerticalScrollIndicator={true}
      showsHorizontalScrollIndicator={true}
    />
  );
};

const styles = StyleSheet.create({
  itemContainerFlatListContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  listFlexBox: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    maxWidth: '100%',
  },
  deleteButton: {
    backgroundColor: 'red',
    color: 'white',
    textAlign: 'center',
    height: '100%',
    width: '100%',
    lineHeight: 70, // adjust this to center text vertically
  },
});
