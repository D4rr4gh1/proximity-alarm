import { useLocation } from '@/hooks/useLocation';
import { LatLong } from '@/types/shared';
import React, { useEffect, useState } from 'react';
import { Platform, StyleSheet, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

interface Props {
    setPinLocation: (coords: LatLong) => void
}

const modest = [
    {
        "featureType": "all",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#202c3e"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.fill",
        "stylers": [
            {
                "gamma": 0.01
            },
            {
                "lightness": 20
            },
            {
                "weight": "1.39"
            },
            {
                "color": "#ffffff"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.text.stroke",
        "stylers": [
            {
                "weight": "0.96"
            },
            {
                "saturation": "9"
            },
            {
                "visibility": "on"
            },
            {
                "color": "#000000"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 30
            },
            {
                "saturation": "9"
            },
            {
                "color": "#29446b"
            }
        ]
    },
    {
        "featureType": "poi",
        "elementType": "geometry",
        "stylers": [
            {
                "saturation": 20
            }
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 20
            },
            {
                "saturation": -20
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry",
        "stylers": [
            {
                "lightness": 10
            },
            {
                "saturation": -30
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#193a55"
            }
        ]
    },
    {
        "featureType": "road",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "saturation": 25
            },
            {
                "lightness": 25
            },
            {
                "weight": "0.01"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "lightness": -20
            }
        ]
    }
]

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
                userInterfaceStyle='dark'
                initialRegion={{
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                    latitudeDelta: 0.0322,
                    longitudeDelta: 0.0221,
                }}
                onPress={(e) => handleCoordChange(e.nativeEvent.coordinate.latitude,e.nativeEvent.coordinate.longitude)}
                customMapStyle={modest}>

            <Marker draggable
                coordinate={{latitude: pinCoords.lat, longitude: pinCoords.long}}
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