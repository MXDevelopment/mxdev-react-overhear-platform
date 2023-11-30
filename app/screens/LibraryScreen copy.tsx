import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, FlatList } from 'react-native';
import { ListItem, Icon, IconTypes } from '../components'; // Adjust the import path as needed
import { Recording, RecordingManager, Author, AuthorManager, User, UserManager } from '../models';

export const LibraryScreen = ({ userId }: { userId: string }) => {
  const [recordings, setRecordings] = useState<Recording[]>([]);
  const [authors, setAuthors] = useState<Author[]>([]);

  useEffect(() => {
    if (!userId) throw new Error("userId is undefined");

    const fetchAuthors = async () => {
      const fetchedAuthors = await AuthorManager.getAllAuthors();
      setAuthors(fetchedAuthors || []);
    };

    const fetchRecordings = async () => {
      try {
        const user: User | null = await UserManager.getCurrentUser(userId);
        if (user && user.recordings) {
          const recordingPromises = user.recordings.map(recordingKey =>
            RecordingManager.getRecording(recordingKey)
          );
          const userRecordings = await Promise.all(recordingPromises);
          const validRecordings = userRecordings.filter(recording => recording !== null) as Recording[];
          setRecordings(validRecordings);
        }
      } catch (error) {
        console.error("Error fetching user recordings:", error);
      }
    };

    fetchAuthors();
    fetchRecordings();
  }, [userId]);

  if (!recordings.length) {
    return (
      <View style={styles.listFlexBox}>
        <Text style={styles.placeholderText}>'You've yet to collect any recordings check the map for your nearest pin'</Text>
      </View>
    );
  } 

  const renderItem = ({ item }: { item: Recording }) => {
    const authorDetails = authors.find(author => author.authorKey === item.ownership?.recordingAuthor);
    const pinIcon = item.pinIcon || 'defaultIcon'; // Replace 'defaultIcon' with your default icon name

    return (
      <ListItem
        LeftComponent={<Icon icon={pinIcon as IconTypes} />}
        title={item.file?.title || 'No Title'}
        author={authorDetails?.name}
        // ...other properties as needed
      />
    );
  };
  
  return (
    <View style={styles.listFlexBox}>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.key || 'default-key'}
        renderItem={renderItem}
        contentContainerStyle={styles.itemContainerFlatListContent}
      />
    </View>
  );
};

// Add your styles here
const styles = StyleSheet.create({
  listFlexBox: {
    flex: 1,
    alignSelf: 'stretch',
    width: '100%',
    maxWidth: '100%',
  },
  itemContainerFlatListContent: {
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'flex-start',
  },
  placeholderText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginTop: 20,
  },
});
