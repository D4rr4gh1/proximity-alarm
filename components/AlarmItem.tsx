import { Alarm } from '@/contexts/context';
import React from 'react';
import { StyleSheet, Text, View, ViewProps } from 'react-native';
import RingIndicator from './RingIndicator';

interface AlarmItemProps extends ViewProps{
    alarm: Alarm
}


const AlarmItem = ({ alarm }: AlarmItemProps) => {

  return (
    <View style={styles.buttonContainer}>
        <RingIndicator active={alarm.active} id={alarm.id}/>
        <Text style={alarm.active ? styles.activeText : styles.buttonText}>{alarm.sound}</Text>
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
    }
})

export default AlarmItem