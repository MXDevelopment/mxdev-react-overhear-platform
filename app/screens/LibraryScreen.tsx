import React, { useState, useEffect } from 'react';
import { View, StyleSheet, FlatList, Text, Alert } from 'react-native';
import { observer } from 'mobx-react';
import { ListItem } from '../components'; // Adjust the import path as needed
import { RecordingManager, useStores } from '../models';

interface CommonRecording {
  key: string;
  title: string;
  description: string;
  authorName?: string;
  authorWebsite?: string;
  authorImage?: string;
  authorBio?: string;
  pinIcon: string;
}

export const LibraryScreen = observer(() => {
  const { authenticationStore } = useStores();
  const userId = authenticationStore.userId;
  console.log("User ID in LibraryScreen:", userId);

  const [recordings, setRecordings] = useState<CommonRecording[]>([]);
  const isAnonymous = !userId; // Determine anonymous based on userId

  useEffect(() => {
    // Fetch data for either anonymous or registered user
    const fetchData = async () => {
      try {
        const data = userId
          ? await RecordingManager.fetchRecordingsAndAuthors(userId)
          : await RecordingManager.fetchRecordingsForAnonymousUser();
        console.log("Fetched Data:", data);
        setRecordings(data);
      } catch (error) {
        console.error("Error fetching library data:", error);
      }
    };
    fetchData();
  }, [userId]);

  useEffect(() => {
    // Prompt for account creation for anonymous users
    if (isAnonymous) {
      promptForAccountCreation();
    }
  }, [isAnonymous]);

  const promptForAccountCreation = () => {
    Alert.alert(
      "Create an Account",
      "Would you like to create an account to save your recordings?",
      [
        {
          text: "Not Now",
          style: "cancel"
        },
        { 
          text: "Create Account", 
          onPress: () => {
            // Navigate to account creation screen
          }
        }
      ]
    );
  };

  const renderItem = ({ item }: { item: CommonRecording }) => {
    return (
      <ListItem
        pinIcon={item.pinIcon}
        title={item.title}
        author={item.authorName}
        // ...other properties as needed
      />
    );
  };

  if (!recordings.length) {
    return (
      <View style={styles.listFlexBox}>
        <Text style={styles.placeholderText}>You've yet to collect any recordings. Check the map for your nearest pin.</Text>
      </View>
    );
  }

  return (
    <View style={styles.listFlexBox}>
      <FlatList
        data={recordings}
        keyExtractor={(item) => item.key}
        renderItem={renderItem}
        contentContainerStyle={styles.itemContainerFlatListContent}
      />
    </View>
  );
});

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
  // Add any additional styles you need
});