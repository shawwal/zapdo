import React, { useState, useEffect } from 'react';
import { ActivityIndicator, StyleSheet } from 'react-native';
import { Link, Stack, useRouter } from 'expo-router';
import { Text, View } from '@/components/Themed';
import { tintColorLight } from '@/constants/Colors';

export default function NotFoundScreen() {
  const [isLoading, setIsLoading] = useState(true);
  const route = useRouter();
  console.log('route', route)
  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000); // Delay for 2 seconds (adjust as needed)
    
    return () => clearTimeout(timer); // Cleanup the timer
  }, []);

  return (
    <>
      <Stack.Screen options={{ title: 'Oops!' }} />
      <View style={styles.container}>
        {isLoading ? (
          <ActivityIndicator size="large" color={tintColorLight} />
        ) : (
          <>
            <Text style={styles.title}>This screen doesn't exist.</Text>
            <Link href="/" style={styles.link}>
              <Text style={styles.linkText}>Go to home screen!</Text>
            </Link>
          </>
        )}
      </View>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  link: {
    marginTop: 15,
    paddingVertical: 15,
  },
  linkText: {
    fontSize: 14,
    color: '#2e78b7',
  },
});
