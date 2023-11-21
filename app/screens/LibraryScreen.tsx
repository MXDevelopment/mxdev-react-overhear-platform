import React, { useState, useEffect } from 'react';
import { FlatList, StyleSheet, View, Text, Animated } from 'react-native';
import { ListItem } from '../components/ListItem';
import { Swipeable, RectButton } from 'react-native-gesture-handler';
import RecordingManager from '../models/RecordingManager';
import UserManager from '../models/UserManager';
import AdminMessageManager from '../models/AdminMessageManager';
import { User } from '../models/User';

export const LibraryScreen = ({ userId }) => {
  const [recordings, setRecordings] = useState([]);

  useEffect(() => {
    const fetchRecordings = async () => {
      try {
        // Fetch user recordings
        let userRecordings = [];
        const user: User | null = await UserManager.getCurrentUser(userId);
        if (user && user.recordings) {
          const allRecordings = await RecordingManager.observeRecordings();
          userRecordings = allRecordings.filter(recording => user.recordings.includes(recording.key));
        }
  
        // Fetch admin messages
        const adminMessages = await AdminMessageManager.getAllAdminMessages();
  
        // Combine user recordings and admin messages, removing duplicates
        const combinedRecordings = [...new Map([...adminMessages, ...userRecordings].map(item => [item.key, item])).values()];
  
        setRecordings(combinedRecordings);
      } catch (error) {
        console.error("Error fetching recordings:", error);
      }
    };
  
    fetchRecordings();
  }, [userId]);

  const handleDelete = async (index) => {
    const newRecordings = [...recordings];
    newRecordings.splice(index, 1);
    setRecordings(newRecordings);

    // TODO: Implement deletion in Firestore
    // For example, you might need to update the user's recordings array in Firestore
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

  const renderItem = ({ item, index }) => (
    <Swipeable renderRightActions={(progress) => renderRightAction(progress, index)}>
      <ListItem key={index} title={item.title} author={item.author} />
    </Swipeable>
  );

  return (
    <FlatList
      style={styles.listFlexBox}
      data={recordings}
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
    lineHeight: 70,
  },
});
