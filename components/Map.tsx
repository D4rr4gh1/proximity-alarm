import { LatLong } from '@/types/shared';
import React, { useEffect, useRef } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
    setPinLocation: (coords: LatLong) => void
    pinLocation: LatLong | undefined
}


const Map = ({setPinLocation, pinLocation} : Props) => {
    const mapRef = useRef<MapView | null>(null)

    const handleCoordChange = (givenLat: number, givenLong: number) => {
        setPinLocation({
            lat: givenLat,
            long: givenLong,
        })
    }


    useEffect(() => {

        if(pinLocation){
            const newRegion = {
                latitude: pinLocation.lat,
                longitude: pinLocation.long,
                latitudeDelta: 0.0322,
                longitudeDelta: 0.0221
            }

        if (mapRef.current) {
            mapRef.current.animateToRegion(newRegion, 500);
        }
    }

    }, [pinLocation])
    
    if (Platform.OS === 'web') {
        return <Text>Map not Supported on web</Text>
    }

    if(!pinLocation) return <Text>Loading Pin Coords</Text>

    return (
        <MapView style = {{ 
                    width: '100%',
                    height: '100%',
                }}
                userInterfaceStyle='dark'
                ref={mapRef}
                initialRegion={{
                    latitude: pinLocation.lat,
                    longitude: pinLocation.long,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}
                onPress={(e) => handleCoordChange(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}>

            <Marker draggable
                coordinate={{latitude: pinLocation.lat, longitude: pinLocation.long}}
                onDragEnd={(e) => handleCoordChange(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}
                isPreselected={true}
                tracksViewChanges={false}/>
        </MapView>
    )
}

const styles = StyleSheet.create({
    customMarker: {
    width: 200,
    height: 200,
    backgroundColor: 'red', // You can mimic the default pin or replace with an Image
    borderRadius: 15,
    borderWidth: 2,
    borderColor: '#fff',
  },
    markerImage: {
    width: 24,
    height: 24,
  },
})

export default Map