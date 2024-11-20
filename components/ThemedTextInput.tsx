import React, { forwardRef } from 'react';
import { TextInput as DefaultInput, type TextInputProps } from 'react-native';
import { useThemeColor } from '@/hooks/useThemeColor';
import { useColorScheme } from 'react-native';

export type ThemedTextInputProps = TextInputProps & {
  lightColor?: string;
  darkColor?: string;
};

export const ThemedTextInput = forwardRef<DefaultInput, ThemedTextInputProps>(
  ({ style, lightColor, darkColor, ...otherProps }, ref) => {
    const theme = useColorScheme() ?? 'light';
    const backgroundColor = useThemeColor({ light: lightColor, dark: darkColor }, 'background');
    const color = useThemeColor({ light: lightColor, dark: darkColor }, 'text');

    // Default placeholder text colors
    const defaultPlaceholderTextColor = theme === 'light' ? '#999' : '#aaa';

    return (
      <DefaultInput
        ref={ref}
        style={[{ backgroundColor, color }, style]}
        placeholderTextColor={defaultPlaceholderTextColor}
        {...otherProps}
      />
    );
  }
);

