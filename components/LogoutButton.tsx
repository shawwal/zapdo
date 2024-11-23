import React from 'react';
import { Pressable, Text, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '@/contexts/AuthContext'; // Adjust the import path if necessary
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useSetRecoilState } from 'recoil';
import { todosState } from '@/recoil/atoms';

const LogoutButton: React.FC = () => {
  const { signOut } = useAuth();
  const router = useRouter();
  const setTodo = useSetRecoilState(todosState)

  const handleLogout = async () => {
    try {
      await signOut();
      // Navigate back to the login screen
      await AsyncStorage.clear();
      setTodo([]);
      router.replace('/(auth)');
    } catch (error) {
      console.error('Error signing out:', error);
    }
  };

  return (
    <Pressable style={styles.button} onPress={handleLogout}>
      <Text style={styles.buttonText}>Logout</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#FF6347', // Tomato color (you can customize this)
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default LogoutButton;
