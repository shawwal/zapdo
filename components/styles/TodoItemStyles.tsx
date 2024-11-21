// components/styles/TodoItemStyles.ts
import { StyleSheet } from 'react-native';

export const todoItemStyles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 12,
    marginBottom: 8,
    borderBottomWidth: 1,
    borderColor: '#ccc'
  },
  iconButton: {
    padding: 10, // Add padding for better touch area
  },
});
