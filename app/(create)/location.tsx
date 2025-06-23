import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

function LocationScreen() {
  return (
    <View style={styles.container}>
        <Text>Set Location</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});



export default LocationScreen