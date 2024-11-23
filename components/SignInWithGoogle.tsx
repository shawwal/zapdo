import React from 'react';
import { StyleSheet, TouchableOpacity, Text, Alert, useColorScheme } from 'react-native';
import { supabase } from '@/lib/supabase';
import * as Linking from 'expo-linking';
import * as WebBrowser from 'expo-web-browser';
import { View } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

// Ensure auth session completes
WebBrowser.maybeCompleteAuthSession();

// Define prop types
interface SignInWithGoogleProps {
  handleSession: (error: Error | null, success: boolean) => void; // Type for the handleSession function
}

// Define the response type for the URL params
interface TokenResponse {
  accessToken: string | null;
  refreshToken: string | null;
  expiresAt: string | null;
  expiresIn: string | null;
}

const SignInWithGoogle: React.FC<SignInWithGoogleProps> = ({ handleSession }) => {
  const theme = useColorScheme(); // Check if it's light or dark mode
  const router = useRouter();
  // Function to extract tokens from URL fragment
  function getTokens(jsonResult: { url: string }) : TokenResponse {
    const url = jsonResult.url || '';
    const fragment = url.split('#')[1];
    const params = new URLSearchParams(fragment);
    const accessToken = params.get('access_token');
    const refreshToken = params.get('refresh_token');
    const expiresAt = params.get('expires_at');
    const expiresIn = params.get('expires_in');

    return { accessToken, refreshToken, expiresAt, expiresIn };
  }

  // Sign-in function
  const handleSignIn = async () => {
    try {
      const redirectUrl = Linking.createURL('auth/callback');
      const { data, error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: redirectUrl,
        },
      });

      if (error) {
        console.error('Error starting sign-in with Google:', error);
        Alert.alert('Error', 'Failed to initiate Google Sign-In.');
        return;
      }

      const authUrl = data?.url;
      if (!authUrl) {
        console.error('No URL received for Google sign-in');
        Alert.alert('Error', 'No URL received for Google sign-in.');
        return;
      }

      // Open the auth session and await the result
      const result = await WebBrowser.openAuthSessionAsync(authUrl, redirectUrl);

      if (result.type === 'success') {
        const tokens = getTokens(result);
        const access = tokens.accessToken;
        const refresh = tokens.refreshToken;

        if (access && refresh) {
          await supabase.auth.setSession({
            access_token: access,
            refresh_token: refresh,
          });

          // Call handleSession to initiate the retry logic
          handleSession(null, true);
        }
      } else if (result.type === 'dismiss') {
        Alert.alert('Canceled', 'Google Sign-In was canceled.');
      } else {
        console.error('Google Sign-In failed:', result);
        Alert.alert('Error', 'Google Sign-In failed.');
      }
    } catch (error) {
      console.error('Error during Google Sign-In:', error);
      Alert.alert('Error', 'An error occurred during Google Sign-In.');
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[
          styles.button,
          theme === 'dark' ? styles.darkMode : styles.lightMode,
        ]}
        onPress={handleSignIn}
      >
        <Ionicons name="logo-google" color={theme === 'dark' ? 'white' : 'black'} size={15} />
        <Text style={[styles.buttonText, theme === 'dark' ? styles.darkText : styles.lightText]}>
          Sign in with Google
        </Text>
      </TouchableOpacity>
    </View>
  );
};

// Style definitions
const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },
  button: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    paddingVertical: 13,
    paddingHorizontal: 19,
    borderRadius: 5,
    borderWidth: 1,
  },
  buttonText: {
    paddingLeft: 5,
    fontSize: 15,
    fontWeight: 'bold',
  },
  darkMode: {
    backgroundColor: '#000000',
    borderColor: '#ffffff',
  },
  lightMode: {
    backgroundColor: '#ffffff',
    borderColor: '#000000',
  },
  darkText: {
    color: '#ffffff',
  },
  lightText: {
    color: '#000000',
  },
});

export default SignInWithGoogle;
