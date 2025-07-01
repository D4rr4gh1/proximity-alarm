import { useDBContext } from '@/contexts/context';
import React from 'react';
import { Pressable, StyleSheet, Text, View } from 'react-native';

const RingScreen = () => {
    const db = useDBContext();
    return (
        <View style={styles.screen}>
            <View style={styles.itemContainers}>
                <View><Text>Alarm Info</Text></View>
                <Pressable style={styles.stopButton}
                        >
                    <Text>STOP</Text>
                    </Pressable>
            </View>        
        <Text>RingScreen</Text>
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
    },
    stopButton: {
        backgroundColor: 'red',
        width: '100%',
        height: 80
    }
})

export default RingScreen