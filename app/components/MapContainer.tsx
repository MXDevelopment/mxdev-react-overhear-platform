import React from 'react';
import MapView from 'react-native-maps';
import { StyleSheet, View } from 'react-native';


const MapContainer = () => {

  return (
    <View style={styles.rectangleView}>
      <MapView style={styles.map}>
      
      </MapView>
    </View>
  );
};


const styles = StyleSheet.create({
  map: {
    width: '100%',
    height: '100%',
  },
  rectangleView: {
    flex: 1,
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
});

export default MapContainer;
