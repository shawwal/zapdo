// styles/styles.js
import { StyleSheet, Platform } from 'react-native';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    marginTop: Platform.OS === 'android' ? 25 : 0,
    // borderWidth: 1,
    // borderColor: 'red'
  },
  list: {
    marginVertical: 16,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 7,
  },
});
