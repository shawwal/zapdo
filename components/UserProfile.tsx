import React, { useState, useEffect, createRef } from 'react';
import { View, Image, Pressable, Animated } from 'react-native';
import {  Text, TextInput } from '@/components/Themed'; 
import { Ionicons } from '@expo/vector-icons';
import { supabase } from '@/lib/supabase'; // Assuming you've set up supabase client
import { createShimmerPlaceholder } from 'react-native-shimmer-placeholder';
import { LinearGradient } from 'expo-linear-gradient';
import styles from '@/components/styles/UserProfileStyles'; // Import the styles from the external file

// Create shimmer placeholder component with LinearGradient
const ShimmerPlaceholder = createShimmerPlaceholder(LinearGradient) as any;

interface UserProfileProps {
  user: any;
  loading: boolean; // New prop for loading state
}

const UserProfile: React.FC<UserProfileProps> = ({ user, loading }) => {

  const [displayName, setDisplayName] = useState<string>(user?.user_metadata?.display_name || '');
  const [email, setEmail] = useState<string>(user?.user_metadata?.email || user?.email);
  const [profilePicture, setProfilePicture] = useState<string | null>(user?.user_metadata?.picture || null);
  const [isEditing, setIsEditing] = useState(false);

  // Create refs for shimmer placeholders
  const avatarRef = createRef<any>(); // Refs for shimmer animation
  const firstLineRef = createRef<any>();
  const secondLineRef = createRef<any>();
  const thirdLineRef = createRef<any>();
  const fourthLineRef = createRef<any>();

  // Handle shimmer animation using Animated API
  useEffect(() => {
    if (loading) {
      const shimmerAnimation = Animated.stagger(400, [
        avatarRef?.current.getAnimated(),
        Animated.parallel([
          firstLineRef?.current.getAnimated(),
          secondLineRef?.current.getAnimated(),
          thirdLineRef?.current.getAnimated(),
          fourthLineRef?.current.getAnimated(),
        ])
      ]);
      
      // Repeat the shimmer animation
      Animated.loop(shimmerAnimation).start();
    }
  }, [loading]);

  const handleSaveChanges = async () => {
    try {
      const { error } = await supabase.auth.updateUser({
        data: {
          display_name: displayName,
          email: email,
        },
      });

      if (error) throw error;

      console.log('User updated successfully!');
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user info:', error);
    }
  };

  if (loading) {
    return (
      <View style={styles.container}>
        <View style={styles.profileHeader}>
          {/* Shimmer Placeholder for Avatar */}
          <ShimmerPlaceholder
            ref={avatarRef}
            style={styles.profileImage}
            shimmering={true}
            stopAutoRun={true} // Prevent auto run until manually triggered
          />
        </View>

        <Text style={styles.title}>
          <ShimmerPlaceholder
            ref={firstLineRef}
            style={[styles.title, { width: 200, height: 30, borderRadius: 6 }]}
            shimmering={true}
            stopAutoRun={true}
          />
        </Text>

        <View style={styles.form}>
          {/* Shimmer for Display Name */}
          <ShimmerPlaceholder
            ref={secondLineRef}
            style={styles.shimmerInput}
            shimmering={true}
            stopAutoRun={true}
          />
          {/* Shimmer for Email */}
          <ShimmerPlaceholder
            ref={thirdLineRef}
            style={styles.shimmerInput}
            shimmering={true}
            stopAutoRun={true}
          />
        </View>

        {/* Shimmer for Save Button */}
        <ShimmerPlaceholder
          ref={fourthLineRef}
          style={[styles.shimmerSaveButton, { width: 150, height: 45 }]}
          shimmering={true}
          stopAutoRun={true}
        />
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.profileHeader}>
        {profilePicture ? (
          <Image source={{ uri: profilePicture }} style={styles.profileImage} />
        ) : (
          <Ionicons name="person-circle-outline" size={100} color="#888" />
        )}
      </View>

      <Text style={styles.title}>User Profile</Text>

      <View style={styles.form}>
        <Text style={styles.label}>Display Name</Text>
        {isEditing ? (
          <TextInput
            value={displayName}
            onChangeText={setDisplayName}
            style={styles.input}
            placeholder="Enter your display name"
          />
        ) : (
          <Text style={styles.text}>{displayName || 'No display name set'}</Text>
        )}

        <Text style={styles.label}>Email</Text>
        {isEditing ? (
          <TextInput
            value={email}
            onChangeText={setEmail}
            style={styles.input}
            editable={false}
            placeholder="Enter your email"
          />
        ) : (
          <Text style={styles.text}>{email || 'No email set'}</Text>
        )}
      </View>

      <View style={styles.actions}>
        {isEditing ? (
          <Pressable onPress={handleSaveChanges} style={styles.saveButton}>
            <Ionicons name="save" size={22} color="white" style={{marginRight: 10}} />
            <Text style={styles.buttonText}>Save Changes</Text>
          </Pressable>
        ) : (
          <Pressable onPress={() => setIsEditing(true)} style={styles.editButton}>
            <Ionicons name="create-outline" size={22} color="white" style={{marginRight: 10}} />
            <Text style={styles.buttonText}>Edit</Text>
          </Pressable>
        )}
      </View>
    </View>
  );
};

export default UserProfile;
