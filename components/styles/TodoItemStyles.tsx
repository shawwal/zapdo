// components/styles/TodoItemStyles.ts
import { StyleSheet } from 'react-native';

export const todoItemStyles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 12,
    marginBottom: 8,
    borderRadius: 8,
  },
  iconButton: {
    padding: 10, // Add padding for better touch area
  },
});
