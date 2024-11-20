// app/(auth)/_layout.tsx
import React from 'react';
import { Stack, Redirect } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext';

export default function AuthLayout() {
  const { session } = useAuth();

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
