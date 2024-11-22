import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useRecoilState } from 'recoil';
import { localAuthState } from '@/recoil/atoms'; // Import the Recoil atom

// Reusable TypeScript component to toggle biometric authentication state
const LocalAuthToggle: React.FC = () => {
  // Get and set the localAuthState using Recoil
  const [localAuth, setLocalAuth] = useRecoilState(localAuthState);

  // Function to toggle the `localAuthState` value
  const toggleAuthState = () => {
    setLocalAuth(prevState => !prevState);  // Toggle the current state
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {localAuth ? 'Biometric Authentication is Enabled' : 'Biometric Authentication is Disabled'}
      </Text>
      <Button
        title={`Turn ${localAuth ? 'Off' : 'On'} Authentication`}
        onPress={toggleAuthState}  // Toggle the state when pressed
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  text: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default LocalAuthToggle;
