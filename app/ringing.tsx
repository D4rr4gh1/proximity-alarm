import { useSharedAudioPlayer } from '@/contexts/alarmContext';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const RingScreen = () => {
    const {stopAlarm, alarmRinging} = useSharedAudioPlayer();

    const handleStop = () => {
        stopAlarm();
        router.push('/')
    }

    return (
        <View style={styles.screen}>
            <View style={styles.itemContainers}>
                <View style={styles.alarmInfo}>
                    <MaterialIcons name="notifications-on" size={120} color="white" />
                    <Text style={styles.alarmText}>Alarm Ringing</Text>
                    <Text style={styles.alarmLabel}>{alarmRinging?.label}</Text>
                    <Text style={styles.rangeText}>You are within your {alarmRinging?.radius}m radius</Text>
                </View>
                <Pressable style={styles.stopButton}
                       onPress={handleStop} >
                    <Text style={styles.stopButtonText}>Turn Off</Text>
                </Pressable>
            </View>
        </View>
    )
}   

const styles = StyleSheet.create({
    screen: {
        backgroundColor: "black",
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    itemContainers: {
        flexDirection:  'column',
        alignItems: 'center',
        height: '90%',
        width: '90%',
        justifyContent: "space-evenly"
    },
    alarmInfo:{
        width: '100%',
        height: '60%',
        justifyContent: 'center',
        alignItems: 'center'
    },
    stopButton: {
        backgroundColor: 'red',
        width: '100%',
        height: 80,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 24
    },
    stopButtonText: {
        fontSize: 26,
        fontWeight: '500',
        color: 'white'
    },
    alarmText: {
        fontSize: 20,
        color: 'white'
    },
    alarmLabel: {
        paddingTop: 20,
        fontSize: 48,
        fontWeight: 'bold',
        color: 'white'
    },
    rangeText: {
        fontSize: 16,
        color: 'white'
    }
})

export default RingScreen