import React, { useState, useEffect } from 'react';
import { StyleSheet, Image } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { View, Text } from '@/components/Themed';
import LocalAuthToggle from '@/components/LocalAuthToggle';
import LogoutButton from '@/components/LogoutButton';
import useSession from '@/hooks/useSessions';
import UserProfile from '@/components/UserProfile';

export default function SettingsScreen() {
  const session = useSession();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulate a loading state with a delay
    const timeout = setTimeout(() => {
      if (session?.user) {
        setLoading(false);  // Set loading to false after 1 seconds
      }
    }, 1000); // 1000 milliseconds = 1 seconds

    // Clean up the timeout on component unmount or when session changes
    return () => {
      clearTimeout(timeout);
    };
  }, [session]); // Dependency array ensures the effect runs when session changes

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#D0D0D0', dark: '#353636' }}
      headerImage={
        <Image
          source={require('@/assets/images/partial-react-logo.png')}
          style={styles.reactLogo}
        />
      }
    >
      <View style={styles.wrapper}>
        {session?.user ? (
          <View style={styles.userProfileContainer}>
            <UserProfile user={session.user} loading={loading} />
          </View>
        ) : (
          <View style={styles.noSessionContainer}>
            <Text style={styles.noSessionText}>No user session available</Text>
          </View>
        )}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>Settings</Text>
        </View>
        <View style={styles.menu}>
          <LocalAuthToggle />
        </View>
        <LogoutButton />
      </View>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: 'absolute',
  },
  wrapper: {
    paddingBottom: 30,
  },
  menu: {
    paddingVertical: 15
  },
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'row',
    gap: 8,
  },
  title: {
    fontSize: 33,
    fontWeight: 'bold',
  },
  noSessionContainer: {
    alignItems: 'center',
    marginTop: 20,
  },
  noSessionText: {
    fontSize: 16,
    color: '#888',
  },
  userProfileContainer: {
    zIndex: 2
  }
});
