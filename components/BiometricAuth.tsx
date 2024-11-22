import React, { useState, useEffect } from 'react';
import { Button, ActivityIndicator, StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import * as LocalAuthentication from 'expo-local-authentication';

interface BiometricAuthProps {
  onSuccess?: (result: any) => void;
  onFailure?: (error: any) => void;
}

const BiometricAuth: React.FC<BiometricAuthProps> = ({ onSuccess, onFailure }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [isChecking, setIsChecking] = useState<boolean>(true);
  const [isBiometricAvailable, setIsBiometricAvailable] = useState<boolean>(false);
  const [authError, setAuthError] = useState<string | null>(null);

  useEffect(() => {
    const checkBiometricsAvailability = async () => {
      try {
        console.log("Checking biometrics availability...");
        const enrolled = await LocalAuthentication.isEnrolledAsync();
        setIsBiometricAvailable(enrolled);
        console.log("Biometrics available:", enrolled);
      } catch (error) {
        console.error('Error checking biometric enrollment:', error);
        setAuthError('Error checking biometric support.');
      } finally {
        setIsChecking(false);
      }
    };

    checkBiometricsAvailability();
  }, []);

  const handleAuthentication = async () => {
    console.log("Attempting authentication...");
    try {
      // If biometrics are available, it will try first; otherwise, fallback to passcode
      const result = await LocalAuthentication.authenticateAsync({
        promptMessage: 'Please authenticate to continue',
        fallbackLabel: 'Use Passcode', // Automatically falls back to passcode if biometrics aren't available
      });

      if (result.success) {
        setIsAuthenticated(true);
        console.log("Authentication successful", result);
        if (onSuccess) onSuccess(result);
      } else {
        setIsAuthenticated(false);
        console.log("Authentication failed", result);
        if (onFailure) onFailure(result);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setIsAuthenticated(false);
      setAuthError('Authentication error.');
      if (onFailure) onFailure(error);
    }
  };

  // Show loading state while checking biometrics
  if (isChecking) {
    return (
      <View style={styles.centerContent}>
        <ActivityIndicator size="large" />
        <Text>Checking biometrics availability...</Text>
      </View>
    );
  }

  // If biometrics are available, prompt for authentication
  if (isBiometricAvailable && !isAuthenticated) {
    return (
      <View style={styles.centerContent}>
        <Text>Please authenticate using biometrics</Text>
        <Button title="Authenticate with Biometrics" onPress={handleAuthentication} />
      </View>
    );
  }

  // If biometrics are unavailable, show a passcode fallback option
  if (!isBiometricAvailable && !isAuthenticated) {
    return (
      <View style={styles.centerContent}>
        <Text>Biometric authentication is not available. Please use your passcode.</Text>
        <Button title="Authenticate with Passcode" onPress={handleAuthentication} />
      </View>
    );
  }

  // If authenticated, show success message
  return (
    <View style={styles.centerContent}>
      <Text>{isAuthenticated ? 'Authentication Successful!' : 'Authentication Failed'}</Text>
    </View>
  );
};


const styles = StyleSheet.create({
  centerContent: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center'
  },
});


export default BiometricAuth;
