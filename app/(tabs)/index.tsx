import React, { useState } from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import TodoList from '@/components/TodoList';
import { useHeaderHeight } from '@react-navigation/elements';
import { useRecoilValue } from 'recoil';
import { localAuthState } from '@/recoil/atoms'; // Assuming you have a recoil atom for localAuthState
import BiometricAuth from '@/components/BiometricAuth'; // Import your BiometricAuth component

export default function HomeScreen() {
  const headerHeight = useHeaderHeight();
  const localAuth = useRecoilValue(localAuthState); // Get the value of localAuthState from Recoil

  // State to track if user is authenticated
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  // Handle success after biometric or pass code authentication
  const handleAuthSuccess = () => {
    setIsAuthenticated(true);  // Update state to show TodoList after success
  };

  // Handle failure after authentication
  const handleAuthFailure = (error: any) => {
    console.error('Authentication failed', error);
    setIsAuthenticated(false);  // In case of failure, don't show TodoList
  };

  return (
    <View style={{ ...styles.container, paddingBottom: headerHeight }}>
      {/* Conditionally render BiometricAuth if localAuthState is true */}
      {localAuth && !isAuthenticated ? (
        <BiometricAuth
          onSuccess={handleAuthSuccess} // Pass success handler
          onFailure={handleAuthFailure}  // Pass failure handler
        />
      ) : (
        <TodoList /> // Show TodoList if authenticated or no biometric auth is needed
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    maxWidth: 800,
    width: '100%',
  },
});
