import React from 'react';
import { Alert, Pressable, StyleSheet } from 'react-native';
import { Text } from './Themed';
import { supabase } from '@/lib/supabase';
import { removeAllAsyncStorageItems } from '@/utils/asyncStorage';
import { useRecoilState } from 'recoil';
import { loadingState } from '@/recoil/atoms';

const DeleteUser = ({ userId, onDeleteComplete }: any) => {
  const [_, setLoading] = useRecoilState(loadingState);

  const handleDeleteUser = async (userId: any) => {
    setLoading(true);
    try {
      const url = 'https://universal.shawwals.com/api/delete-user';
      console.log('Sending request to:', url);
      console.log('userId:', userId);

      const response = await fetch(url, {
        method: 'POST', // Use POST as per your existing code (DELETE would typically be used for deletions, but if POST is required, that's okay)
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId }), // Send only userId in the body
      });

      console.log('Response Status:', response.status);
      console.log('Response OK:', response.ok);
      
      // Ensure the response is valid and contains the expected success message
      if (response.ok) {
        const responseData = await response.json(); // Try to parse the JSON response
        console.log('Response Data:', responseData); // Log response to see what was returned

        // Check if the message indicates success
        if (responseData.message && responseData.message.includes("deleted successfully")) {
          // Success: sign out and clear async storage
          await supabase.auth.signOut();
          await removeAllAsyncStorageItems();
          onDeleteComplete(); // Notify parent that deletion is complete
        } else {
          // If the message doesn't indicate success, show an error
          Alert.alert('Deletion Failed', responseData.message || 'Failed to delete account. Please try again.');
        }
      } else {
        // If the response status is not ok, try parsing as JSON or handle as non-JSON error
        try {
          const errorData = await response.json();
          console.log('Error Data:', errorData);
          Alert.alert('Deletion Failed', errorData.message || 'Failed to delete account. Please try again.');
        } catch (err) {
          console.error('Error parsing error response:', err);
          Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
        }
      }
    } catch (error) {
      console.error('Request failed:', error); // Log the actual error
      Alert.alert('Error', 'An unexpected error occurred. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const confirmDelete = () => {
    Alert.alert(
      'Confirm Deletion',
      'Are you sure you want to delete this account? This action is irreversible.',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Delete',
          onPress: () => handleDeleteUser(userId),
          style: 'destructive', // iOS style for destructive actions
        },
      ]
    );
  };

  return (
    <Pressable onPress={confirmDelete} style={styles.deleteButton}>
      <Text style={styles.deleteText}>Delete Account</Text>
    </Pressable>
  );
};

const styles = StyleSheet.create({
  deleteButton: {
    backgroundColor: 'transparent',
    borderColor: '#FF5252',
    borderWidth: 1,
    borderRadius: 5,
    paddingVertical: 13,
    alignItems: 'center',
    marginVertical: 10,
  },
  deleteText: {
    color: '#FF5252',
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

export default DeleteUser;
