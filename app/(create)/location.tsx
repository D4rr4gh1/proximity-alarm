import BackArrow from '@/components/BackArrow';
import Map from '@/components/Map';
import { LatLong } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React, { useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';


function LocationScreen() {
  const [pinLocation, setPinLocation] = useState<LatLong>()

  const handlePress = async () => {
    await AsyncStorage.setItem('COORDS', JSON.stringify(pinLocation));
    router.push('/proximity')
  }
  return (
    // <SafeAreaProvider>
    //   <SafeAreaView style={styles.container}>
    <View style={styles.container}>
        <Map setPinLocation={setPinLocation}/>
        <BackArrow/>
        <Pressable
          style={styles.buttonContainer}
          onPress={handlePress}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
    </View>
    //   </SafeAreaView>
    // </SafeAreaProvider>
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
  buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#3277D6',
        borderRadius: 15,
        padding: 20,
        width: '90%',
        position: 'absolute',
        bottom: '8%'
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});



export default LocationScreen