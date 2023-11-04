import React, { useState, useEffect } from 'react';
import MapView, { Marker } from 'react-native-maps';
import { StyleSheet, View } from 'react-native';
import { initializeApp } from 'firebase/app';
import { getFirestore, GeoPoint, collection, getDocs } from 'firebase/firestore';
import { firebaseConfig } from '../../firebase';


const MapContainer = () => {
  const [markers, setMarkers] = useState([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const firestore = getFirestore();

    getDocs(collection(firestore, 'Pins')).then(querySnapshot => {
      querySnapshot.forEach(doc => {
        const isAvailable = doc.data().isAvailable;
        if (isAvailable) {
          const location = doc.data().location;
          if (location && location.geoPoint) {
            const geoPoint = new GeoPoint(location.geoPoint.lat, location.geoPoint.long);
            setMarkers(prevMarkers => [...prevMarkers, geoPoint]);
          }
        }
      });
    });
  }, []);

  return (
    <View style={styles.rectangleView}>
      <MapView style={styles.map}> 
        {markers.map(marker => (
          <Marker coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }} />
        ))}
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