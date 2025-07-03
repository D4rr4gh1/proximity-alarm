import { Ionicons } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';

interface BackArrowProps {
    arrowColor: string
}


const BackArrow = ({arrowColor} : BackArrowProps) => {
    const handlePress = async () => {

        const coords = await AsyncStorage.getItem('COORDS');
        const radius = await AsyncStorage.getItem("RADIUS");
        if (coords) {
            await AsyncStorage.removeItem('COORDS')
            console.log("Coords Deleted")
        }
        if (radius) {
            await AsyncStorage.removeItem('RADIUS')
            console.log("Radius Deleted")
        }
        router.back()
    }


  return (
    <TouchableOpacity
    onPress={handlePress}
    style={styles.arrow}>
        <Ionicons name="arrow-back" size={32} color={arrowColor}/>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    arrow: {
        position: 'absolute',
        top: '5.8%',
        left: '3%'
    },
})

export default BackArrow