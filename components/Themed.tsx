// Themed.tsx
import React from 'react';
import { View as RNView, Text as RNText, TextInput as RNTextInput, ViewProps, TextProps, TextInputProps } from 'react-native';
import useTheme from '@/hooks/useTheme';
import { Colors } from '@/constants/Colors';

export const View: React.FC<ViewProps> = (props) => {
    const theme = useTheme();
    return <RNView {...props} style={[{ backgroundColor: Colors[theme].background }, props.style]} />;
};

export const Text: React.FC<TextProps> = (props) => {
    const theme = useTheme();
    return <RNText {...props} style={[{ color: Colors[theme].text }, props.style]} />;
};

export const TextInput: React.FC<TextInputProps> = (props) => {
    const theme = useTheme();
    return <RNTextInput {...props} style={[{ color: Colors[theme].inputText }, props.style]} />;
};
