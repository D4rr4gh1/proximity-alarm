import Map from '@/components/Map';
import { LatLong } from '@/types/shared';
import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';

function LocationScreen() {
  const [pinLocation, setPinLocation] = useState<LatLong>()

  console.log(`From loc screen pin is ${pinLocation}`)
  return (
    <SafeAreaProvider>
      <SafeAreaView style={styles.container}>
        <Map setPinLocation={setPinLocation}/>
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