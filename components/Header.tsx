// components/Header.tsx
import React from 'react';
import { TouchableOpacity, SafeAreaView } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useRecoilValue } from 'recoil';
import { isConnectedState, showSyncButtonState } from '@/recoil/atoms';
import { Ionicons } from '@expo/vector-icons'; // Using Expo icons
import { headerStyles as styles } from '@/components/styles/HeaderStyles';

interface HeaderProps {
  onSync: () => void;
}

const Header: React.FC<HeaderProps> = ({ onSync }) => {
  const isConnected = useRecoilValue(isConnectedState);
  const showSyncButton = useRecoilValue(showSyncButtonState);

  return (
    <SafeAreaView>
      <ThemedView style={styles.header}>
        <ThemedText style={styles.title}>Todo List</ThemedText>
        {!isConnected && <ThemedText style={styles.noConnection}>No Internet Connection</ThemedText>}
        {showSyncButton && (
          <TouchableOpacity onPress={onSync} style={styles.syncButton}>
            <Ionicons name="sync-outline" size={24} color="#007AFF" />
          </TouchableOpacity>
        )}
      </ThemedView>
    </SafeAreaView>
  );
};

export default Header;
