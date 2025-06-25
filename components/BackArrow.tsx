import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';
import React from 'react';
import { Image, StyleSheet, TouchableOpacity } from 'react-native';

const BackArrow = () => {
    const handlePress = async () => {

        const coords = await AsyncStorage.getItem('COORDS');
        if (coords) {
            AsyncStorage.removeItem('COORDS')
            console.log("Coords Deleted")
        }
        router.back()
    }


  return (
    <TouchableOpacity
    onPress={handlePress}
    style={styles.arrow}>
        <Image 
        source={require("@/assets/images/ArrowLeft.png")}
        style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
    arrow: {
        position: 'absolute',
        top: '7%',
        left: '2%'
    },
    image: {
        height: 60,
        width: 60
    }
})

export default BackArrow