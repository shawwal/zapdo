import React from 'react';
import { KeyboardAvoidingView, View, Platform, StyleSheet, KeyboardAvoidingViewProps } from 'react-native';
import { useBottomTabBarHeight } from '@react-navigation/bottom-tabs';
// Custom KeyboardAvoidingWrapper component
interface KeyboardAvoidingWrapperProps extends KeyboardAvoidingViewProps {
  disabled: boolean; // Prop to control whether keyboard avoiding is disabled or not
}

const KeyboardAvoidingWrapper: React.FC<KeyboardAvoidingWrapperProps> = ({ disabled, children, ...props }) => {
  // If disabled is false, just render a regular View
  const tabBarHeight = useBottomTabBarHeight();

  if (disabled) {
    return <View style={{...styles.container, marginBottom: Platform.OS === 'ios' ? tabBarHeight : 0 }}>{children}</View>;
  }

  // Otherwise, render KeyboardAvoidingView
  return (
    <KeyboardAvoidingView
      {...props}
      style={{...styles.container, marginBottom: Platform.OS === 'ios' ? tabBarHeight : 0 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      {children}
    </KeyboardAvoidingView>
  );
};

// Basic styles for the wrapper
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%'
  },
});

export default KeyboardAvoidingWrapper;
