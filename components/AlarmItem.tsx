import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const AlarmItem = () => {
  return (
    <Pressable style={styles.buttonContainer}>
        <Text style={styles.buttonText}>AlarmItem</Text>
    </Pressable>
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
        width: 350,
    },
    buttonText: {
        color: 'black',
        fontSize: 20
    }
})

export default AlarmItem