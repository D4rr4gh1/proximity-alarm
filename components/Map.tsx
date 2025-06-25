import { useLocation } from '@/hooks/useLocation';
import React, { useEffect, useState } from 'react';
import { Platform, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface LatLong {
    lat: number,
    long: number,
}

const Map = () => {
    const { location, errorMsg } = useLocation();
    const [ pinCoords, setPinCoords ] = useState<LatLong>();

     useEffect(() => {
    if (location && !pinCoords) {
      setPinCoords({
        lat: location.coords.latitude,
        long: location.coords.longitude,
      });
    }
  }, [location]);

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
                }}>

            <Marker draggable
                coordinate={{latitude: pinCoords.lat, longitude: pinCoords.long}}
                onDragEnd={(e) => setPinCoords({ lat: e.nativeEvent.coordinate.latitude, long: e.nativeEvent.coordinate.longitude})}
            />
        </MapView>
    )
}

export default Map