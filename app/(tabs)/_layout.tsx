import { Tabs } from 'expo-router';
import React, { useState } from 'react';
import { Platform } from 'react-native';

import { HapticTab } from '@/components/HapticTab';
import { IconSymbol } from '@/components/ui/IconSymbol';
import TabBarBackground from '@/components/ui/TabBarBackground';
import { Colors } from '@/constants/Colors';
import { useColorScheme } from '@/hooks/useColorScheme';
import BiometricAuth from '@/components/BiometricAuth';  // Import BiometricAuth component
import { useRecoilValue } from 'recoil';
import { localAuthState } from '@/recoil/atoms'; // Assuming localAuthState atom exists

export default function TabLayout() {
  const colorScheme = useColorScheme();
  const localAuth = useRecoilValue(localAuthState); // Retrieve the localAuth state from Recoil

  // State to track authentication
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Handle success after biometric or passcode authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true); // Update state to allow access to tabs
  };

  // Handle failure after authentication
  const handleAuthFailure = (error: any) => {
    console.error('Authentication failed', error);
    setIsAuthenticated(false); // Fail authentication
  };

  if (!isAuthenticated && localAuth) {
    // If not authenticated and biometric authentication is enabled, show the auth screen
    return (
      <BiometricAuth
        onSuccess={handleAuthSuccess}
        onFailure={handleAuthFailure}
      />
    );
  }

  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: Colors[colorScheme ?? 'light'].tint,
        headerShown: false,
        tabBarButton: HapticTab,
        tabBarBackground: TabBarBackground,
        tabBarStyle: Platform.select({
          ios: {
            position: 'absolute', // Use a transparent background on iOS to show the blur effect
          },
          default: {},
        }),
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="settings"
        options={{
          title: 'Settings',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="gear" color={color} />,
        }}
      />
      <Tabs.Screen
        name="updates"
        options={{
          title: 'Updates',
          tabBarIcon: ({ color }) => <IconSymbol size={28} name="cloud" color={color} />,
        }}
      />
    </Tabs>
  );
}
