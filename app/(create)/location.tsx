import Map from '@/components/Map';
import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function LocationScreen() {
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Map/>
      </SafeAreaView>
    </SafeAreaProvider>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  map: {
    width: '100%',
    height:'100%',
  },
});



export default LocationScreen