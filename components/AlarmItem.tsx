import { Alarm } from '@/contexts/context';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, ViewProps } from 'react-native';

interface AlarmItemProps extends ViewProps{
    alarm: Alarm
}


const AlarmItem = ({ alarm }: AlarmItemProps) => {
  return (
    <TouchableOpacity style={styles.buttonContainer}>
        <Text style={styles.buttonText}>{alarm.sound}</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#FFFFFF',
        borderRadius: 10,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        width: '90%'
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    }
})

export default AlarmItem