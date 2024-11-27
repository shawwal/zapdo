import React from 'react';
import { StyleSheet } from 'react-native';
import { View } from '@/components/Themed';
import TodoList from '@/components/TodoList';

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <TodoList />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
});
