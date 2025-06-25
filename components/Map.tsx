import { useLocation } from '@/hooks/useLocation';
import { LatLong } from '@/types/shared';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
    setPinLocation: (coords: LatLong) => void
}

const Map = ({setPinLocation} : Props) => {
    const { location, errorMsg } = useLocation();
    const [ pinCoords, setPinCoords ] = useState<LatLong>();

    useEffect(() => {
        if (location && !pinCoords) {
        setPinCoords({
            lat: location.coords.latitude,
            long: location.coords.longitude,
        });
        setPinLocation({
            lat: location.coords.latitude,
            long: location.coords.longitude,
        })
        }
    }, [location]);

    const handleCoordChange = (givenLat: number, givenLong: number) => {
        setPinCoords({
            lat: givenLat,
            long: givenLong,
        });
        setPinLocation({
            lat: givenLat,
            long: givenLong,
        })
    }

    if (errorMsg) return <Text>Error: {errorMsg}</Text>;
    if (!location) return <Text>Loading...</Text>;
    
    if (Platform.OS === 'web') {
        return <Text>Map not Supported on web</Text>
    }

    if(!pinCoords) return <Text>Loading Pin Coords</Text>

    return (
        <MapView style = {{ 
                    width: '100%',
                    height: '100%',
                }}
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}
                onPress={(e) => handleCoordChange(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}>

            <Marker draggable
                coordinate={{latitude: pinCoords.lat, longitude: pinCoords.long}}
                onDragEnd={(e) => handleCoordChange(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}
                isPreselected={true}
                tracksViewChanges={false}
            >
            </Marker>
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