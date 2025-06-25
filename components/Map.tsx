import React from 'react'
import { Platform, Text } from 'react-native'

const Map = () => {
    if (Platform.OS === 'web') {
        return <Text>Map not Supported on web</Text>
    }

    const MapView = require('react-native-maps').default
    return (
        <MapView style = {{ 
            width: '100%',
            height: '100%',
        }}/>
    )
}

export default Map