import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleSheet, Text } from 'react-native';

interface ButtonProps{
    url: string
}

const Button = ({ url } : ButtonProps) => {
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
            onPress={() => router.push(url as any)}>
            <Text style={styles.buttonText}>+ New Alarm</Text>
        </Pressable>
)};

const styles = StyleSheet.create({
    buttonContainer: {
        alignItems: 'center',
        backgroundColor: '#3277D6',
        borderRadius: 15,
        marginHorizontal: 10,
        marginTop: 30,
        marginBottom: 10,
        padding: 20,
        width: 350
    },
    buttonText: {
        color: 'white',
        fontSize: 20,
    },
});

export default Button;