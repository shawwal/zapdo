import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '100%',
    maxWidth: 600,
    paddingTop: Platform.OS === 'ios' ? 0 : 30 ,
    paddingHorizontal: 16,
  },
  list: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
  },
});
