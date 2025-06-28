import { alarmSounds } from '@/assets/alarmsounds';
import { Alarm } from '@/contexts/context';
import { getDistanceInMeters } from '@/utils/calcDistance';
import { useAudioPlayer } from 'expo-audio';
import * as Location from 'expo-location';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View, ViewProps } from 'react-native';
import RingIndicator from './RingIndicator';

interface AlarmItemProps extends ViewProps{
    alarm: Alarm
    location: Location.LocationObject
}


const AlarmItem = ({ alarm, location }: AlarmItemProps) => {

    const player = useAudioPlayer(alarmSounds[alarm.sound]);

    const parsed = JSON.parse(alarm.coords);
    console.log('Loaded pin location:', parsed['lat']);

    const distance = getDistanceInMeters(
        location.coords.latitude,
        location.coords.longitude,
        parsed['lat'],
        parsed['long']
        );
    
    
    const handleRing = () => {
        player.seekTo(0);
        player.play();

    }


  return (
    <View style={styles.buttonContainer}>
        <RingIndicator active={alarm.active} id={alarm.id}/>
        <View style={{ flexDirection: 'row', justifyContent: 'space-between'}}>
            <View style={styles.itemTextContainer}>
                <Text style={alarm.active ? styles.activeText : styles.buttonText}>{alarm.label}</Text>
                <Text>Distance: {distance}m</Text>
            </View>
            <TouchableOpacity onPress={handleRing}>
                <Text>TEST SOUND</Text>
            </TouchableOpacity>
        </View>
    </View>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        width: '90%',
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        height: 120
    },
    buttonText: {
        color: 'black',
        fontSize: 36
    },
    activeText: {
        color: 'green',
        fontSize: 36
    },
    itemTextContainer: {
        flexDirection: 'column'
    }
})

export default AlarmItem