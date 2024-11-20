// components/styles/HeaderStyles.ts
import { StyleSheet } from 'react-native';

export const headerStyles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  noConnection: {
    color: '#FF6347',
    fontSize: 14,
  },
  syncButton: {
    padding: 10, // Increase touch area
  },
});
