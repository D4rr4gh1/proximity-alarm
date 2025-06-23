import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

const Button = () => {
    const handlePress = () => {
        console.log('Pressed');
    };
    const handleRelease = () => {
        console.log('Released');
    };
    return (
        <Pressable
            style={styles.buttonContainer}
            onPressIn={handlePress}
            onPressOut={handleRelease}
            onPress={() => router.push("/(create)/location")}>
            <Text style={styles.buttonText}>Press me</Text>
        </Pressable>
)};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: 'lightblue',
        borderRadius: 5,
        marginHorizontal: 10,
        marginVertical: 10,
        padding: 20,
        width: 350
    },
    buttonText: {
        color: 'black',
        fontSize: 20,
    },
});

export default Button;