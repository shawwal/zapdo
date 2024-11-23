import React from 'react';
import { Switch, StyleSheet } from 'react-native';
import { View, Text } from '@/components/Themed';
import { useRecoilState } from 'recoil';
import { localAuthState } from '@/recoil/atoms'; // Import the Recoil atom

// Reusable TypeScript component to toggle biometric authentication state
const LocalAuthToggle: React.FC = () => {
  // Get and set the localAuthState using Recoil
  const [localAuth, setLocalAuth] = useRecoilState(localAuthState);

  // Function to toggle the `localAuthState` value
  const toggleAuthState = (value: boolean) => {
    setLocalAuth(value);  // Set the state to the value from the switch
  };

  return (
    <View style={styles.container}>
      <Text style={styles.text}>
        {localAuth ? 'Biometric Authentication is Enabled' : 'Biometric Authentication is Disabled'}
      </Text>
      <Switch
        value={localAuth}  // Bind the switch to the state value
        onValueChange={toggleAuthState}  // Toggle the state when the switch is toggled
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 15
  },
});

export default LocalAuthToggle;
