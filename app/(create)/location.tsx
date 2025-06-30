import BackArrow from '@/components/BackArrow';
import Map from '@/components/Map';
import { LatLong } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
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
        <MaskedView style={{position: 'absolute', height: "50%", width: '100%', top: 0}}
          maskElement={
            <LinearGradient
              colors={['black', 'transparent']}
              style={{flex: 1}}
            />
          }
          pointerEvents='none'>
          <BlurView intensity={1} style={{flex: 1, backgroundColor: 'rgba(0, 0, 0, 1)'}} />
        </MaskedView>
        <BackArrow arrowColor='white'/>
        <View style={styles.header}>
          <Text style={styles.headerText}>Set Location</Text>
        </View>
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
  header: {
    position: 'absolute',
    left: '15%',
    top: '5%'
  },
  headerText: {
    fontSize: 36,
    fontWeight: 'bold',
    color: 'white'
  },

});



export default LocationScreen