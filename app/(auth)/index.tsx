// app/(root)/(auth)/login.tsx
import React from 'react';
import { StyleSheet, Image, Dimensions, View, Platform } from 'react-native';
import { Text } from '@/components/Themed';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import LoginForm from '@/components/LoginForm';
import LoginWithApple from '@/components/LoginWithApple';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const { session } = useAuth();

  if (session) {
    // Redirect authenticated users to the main app
    return <Redirect href="/(tabs)" />;
  }

  return (
    <View style={styles.container}>
      <View style={styles.wrapper}>
        <Image
          style={styles.tinyLogo}
          source={require('@/assets/images/logo-z.png')}
        />
        <LoginForm />
        {Platform.OS === 'ios' ?
          (
            <>
              <View style={styles.separator}>
                <View style={styles.thinBorder} />
                <Text>or</Text>
                <View style={styles.thinBorder} />
              </View>
              <View style={styles.socialLogin}>
                <LoginWithApple />
              </View>
            </>
          )
          : <View />
        }
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16, // Add some padding for iPad screens
  },
  wrapper: {
    width: '95%', // Use 90% width to make it responsive
    maxWidth: 500, // Max width for larger screens like iPads
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5, // For Android shadow
  },
  tinyLogo: {
    width: width < 768 ? 150 : 200, // Make logo size responsive for small vs. large screens
    height: width < 768 ? 150 : 200, // Same for height
  },
  separator: {
    paddingVertical: 23,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  thinBorder: {
    borderColor: '#ccc',
    borderTopWidth: 1,
    marginHorizontal: 15,
    width: 150,
  },
  socialLogin: {
    alignItems: 'center'
  }
});

