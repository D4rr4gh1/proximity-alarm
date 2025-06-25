import { router } from 'expo-router';
import React from 'react';
import { Pressable, StyleProp, Text, TextStyle, ViewStyle } from 'react-native';

interface ButtonProps{
    url: string;
    viewStyle?: StyleProp<ViewStyle>;
    textStyle?: StyleProp<TextStyle>;
    label?: string;

}

const Button = ({ url, viewStyle, textStyle, label = "Button" } : ButtonProps) => {
    const handlePress = () => {
        console.log('Pressed');
    };
    const handleRelease = () => {
        console.log('Released');
    };

    return (
        <Pressable
            style={viewStyle}
            onPressIn={handlePress}
            onPressOut={handleRelease}
            onPress={() => router.push(url as any)}>
            <Text style={textStyle}>{label}</Text>
        </Pressable>
)};

export default Button;