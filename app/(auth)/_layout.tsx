// app/(auth)/_layout.tsx
import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';
import { ActivityIndicator } from 'react-native';
import { View } from '@/components/Themed';
import { tintColorLight } from '@/constants/Colors';

export default function AuthLayout() {
  const { session, loading } = useAuth();
  // console.log('session', session)

  if (loading) {
    return (
      <View style={{flex: 1,  justifyContent: 'center', alignItems: 'center'}}>
        <ActivityIndicator size="large" color={tintColorLight} />
      </View>
    );
  }

  if (session) {
    // If the user is authenticated, redirect to the main app
    return <Redirect href="/(tabs)" />;
  }

  return (
    <Stack screenOptions={{ headerShown: false }}>
      <Stack.Screen name="index" />
      {/* Add other unauthenticated screens here if needed */}
    </Stack>
  );
}
