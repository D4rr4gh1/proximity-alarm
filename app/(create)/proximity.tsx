import BackArrow from '@/components/BackArrow';
import { LatLong } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Slider from '@react-native-community/slider';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useRef, useState } from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';
import MapView, { Circle, Marker } from 'react-native-maps';

function ProximityScreen() {
  const mapRef = useRef<MapView | null>(null)
  const pinLocation = useRef<LatLong>({lat: 0.0, long: 0.0})
  const [alarmRadius, setAlarmRadius] = useState(1000)
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const getSavedLoc = async () => {
      try {
        const stored = await AsyncStorage.getItem('COORDS');
        if (stored) {
          const parsed = JSON.parse(stored);
          pinLocation.current = parsed;
          console.log('Loaded pin location:', parsed);
        }
      } catch (e) {
        console.error('Failed to load coords:', e);
      } finally {
        setReady(true);
      }
    };

    getSavedLoc();
  }, []);


  useEffect(() => {

    const newRegion = {latitude: pinLocation.current.lat,
          longitude: pinLocation.current.long,
          latitudeDelta: (alarmRadius / 111000) * 5,
          longitudeDelta: (alarmRadius / 111000) * 5
      }

     if (mapRef.current) {
      mapRef.current.animateToRegion(newRegion, 300);
    }

  },[alarmRadius])


  const handlePress = async () => {
    await AsyncStorage.setItem('RADIUS', String(alarmRadius));
    router.push('/options')
  }

  if (!ready) {
    return <Text>Loading...</Text>;
  }

  if (!pinLocation) return <Text>Loading...</Text>;

  return (
      <View style={styles.container}>
        <MapView style = {{ 
                    width: '100%',
                    height: '80%',
                    top: 0,
                    position: 'absolute'
                }}
                userInterfaceStyle='dark'
                ref={mapRef}
                initialRegion={{latitude: pinLocation.current.lat,
                    longitude: pinLocation.current.long,
                    latitudeDelta: 0.0522,
                    longitudeDelta: 0.0421
                }}>

            <Marker
                coordinate={{latitude: pinLocation.current.lat, longitude: pinLocation.current.long}}
                tracksViewChanges={false}/>

            <Circle 
                center={{latitude: pinLocation.current.lat, longitude: pinLocation.current.long}}
                radius={alarmRadius}
                strokeColor='rgba(255, 255, 255, 0.7)'
                fillColor='rgba(192, 236, 250, 0.5)'>
            </Circle>
        </MapView>
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
          <Text style={styles.headerText}>Set Proximity</Text>
        </View>
        <View style={{backgroundColor: 'white',
          borderRadius: 30,
          position: 'absolute',
          height: '30%',
          width: '100%',
          bottom: 0,
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <Text>{alarmRadius}</Text>
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '90%' }}>
            <Slider style={{ width: '100%'}}
              minimumValue={100}
              maximumValue={5000}
              value={alarmRadius}
              step={100}
              onValueChange={(value) => setAlarmRadius(value)}
              minimumTrackTintColor="#1EB1FC"
              maximumTrackTintColor="#d3d3d3"
            />
          </View>
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', width: '100%' }}>
            <Pressable
              style={styles.buttonContainer}
              onPress={handlePress}>
                <Text style={styles.buttonText}>Next</Text>
            </Pressable>
          </View>
        </View>
      </View>
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
        bottom: '20%'
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

export default ProximityScreen