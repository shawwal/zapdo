// app/(root)/(auth)/login.tsx
import React, { useState, useCallback, useEffect } from 'react';
import { StyleSheet, Image, Dimensions, View, Platform, ActivityIndicator } from 'react-native';
import { Text } from '@/components/Themed';
import { useAuth } from '@/contexts/AuthContext';
import { Redirect } from 'expo-router';
import LoginForm from '@/components/LoginForm';
import LoginWithApple from '@/components/LoginWithApple';
import SignInWithGoogle from '@/components/SignInWithGoogle';
import { supabase } from '@/lib/supabase';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
  const { session } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  const [retryCount, setRetryCount] = useState(0);
  const MAX_RETRIES = 5;

  // Redirect authenticated users to the main app
  if (session) {
    return <Redirect href="/(tabs)" />;
  }

  const handleSession = useCallback(async (session: any, shouldRetry = false) => {
    if (!session) {
      if (shouldRetry && retryCount < MAX_RETRIES) {
        console.log(`Session is null, retrying in 1 second (Retry ${retryCount + 1}/${MAX_RETRIES})`);
        setRetryCount(retryCount + 1);
        setTimeout(async () => {
          const { data: { session: newSession } } = await supabase.auth.getSession();
          handleSession(newSession, true);
        }, 1000);
      } else {
        console.log('Session is null, no more retries');
        setIsLoading(false);
        setRetryCount(0); // Reset retry count
      }
      return;
    }

    setRetryCount(0); // Reset retry count on successful session retrieval
    setIsLoading(false);
  }, [retryCount]);

  useEffect(() => {
    const fetchSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      handleSession(session, false); // Set shouldRetry to false
    };

    fetchSession();

    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (_event, session) => {
      handleSession(session, false); // Set shouldRetry to false
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [handleSession]);

  return (
    <View style={styles.container}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#ccc" />
      ) : (
        <View style={styles.wrapper}>
          <Image
            style={styles.tinyLogo}
            source={require('@/assets/images/logo-z.png')}
          />
          <LoginForm />

          <View style={styles.separator}>
            <View style={styles.thinBorder} />
            <Text>or</Text>
            <View style={styles.thinBorder} />
          </View>
          
          <View style={styles.socialLogin}>
            {Platform.OS === 'ios' && <LoginWithApple />}
            <SignInWithGoogle handleSession={handleSession} />
          </View>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
  },
  wrapper: {
    width: '95%',
    maxWidth: 500,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.1,
    shadowRadius: 10,
    elevation: 5,
  },
  tinyLogo: {
    width: width < 768 ? 150 : 200,
    height: width < 768 ? 150 : 200,
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
    alignItems: 'center',
  }
});
