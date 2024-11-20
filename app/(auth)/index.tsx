// app/(root)/(auth)/login.tsx
import React from 'react';
import { View, StyleSheet } from 'react-native';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import LoginForm from '@/components/LoginForm';

export default function LoginScreen() {
  const { session } = useAuth();

  if (session) {
    // Redirect authenticated users to the main app
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <LoginForm />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
});
