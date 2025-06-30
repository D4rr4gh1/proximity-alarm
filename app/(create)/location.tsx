import BackArrow from '@/components/BackArrow';
import Map from '@/components/Map';
import { useLocation } from '@/hooks/useLocation';
import { LatLong } from '@/types/shared';
import AsyncStorage from '@react-native-async-storage/async-storage';
import MaskedView from '@react-native-masked-view/masked-view';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';
import { router } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { Pressable, StyleSheet, Text, TextInput, View } from 'react-native';



function LocationScreen() {
  const [pinLocation, setPinLocation] = useState<LatLong>();
  const [searchLocation, setSearchLocation] = useState('');
  const { location, errorMsg } = useLocation();
  const ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;
  // console.log(ACCESS_TOKEN)
  
  useEffect(() => {
      if (location && !pinLocation) {
      setPinLocation({
          lat: location.coords.latitude,
          long: location.coords.longitude,
      })
      }
  }, [location]);

  const handlePress = async () => {
    console.log("Coords on set are: ", pinLocation)
    await AsyncStorage.setItem('COORDS', JSON.stringify(pinLocation));
    router.push('/proximity');
  }

  if (errorMsg) return <Text>{errorMsg}</Text>
  if(!location) return <Text>LoadingLocation</Text>
 
  const handleSearch = async (searchLocation: string) => {


      await fetch(`https://api.mapbox.com/search/geocode/v6/forward?q=${searchLocation}&proximity=${location.coords.longitude},${location.coords.latitude}&access_token=pk.eyJ1IjoiZDRycjRnaCIsImEiOiJjbWNqYTVucHgwMWxlMmtzbWJxMWhka2V0In0.oshYJvhy2TIdHHzKanBU4w`)
      .then( response => response.json() )
      .then( data => { 
          const coords = data['features'][0]['geometry']['coordinates'];
          setPinLocation({
            lat: coords[1],
            long: coords[0]
          });
       })
  }

  console.log(searchLocation)
  return (
    // Overall container
    <View style={styles.container}>

        {/* Map Component */}
        <Map setPinLocation={setPinLocation} pinLocation={pinLocation}/>

        {/* Blur effect for top of page for cleaner transition. Uses mask and gradient for smoother fade  */}
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
        
        {/* Header and Arrow */}
        <BackArrow arrowColor='white'/>
        <View style={styles.header}>
          <Text style={styles.headerText}>Set Location</Text>
        </View>

        {/* Search Bar to search for address */}
        <TextInput
          style={styles.input}
          onEndEditing={(e) => {handleSearch(e.nativeEvent.text)}}
          placeholder="Search Location"
        />
        

        {/* Next Button */}
        <Pressable
          style={styles.buttonContainer}
          onPress={handlePress}>
            <Text style={styles.buttonText}>Next</Text>
          </Pressable>
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
  input: {
    height: 70,
    width: "92%",
    margin: 12,
    borderWidth: 1,
    borderRadius: 20,
    padding: 10,
    position: 'absolute',
    left: '1%',
    top: '10%',
    backgroundColor: 'white'
  },

});



export default LocationScreen;