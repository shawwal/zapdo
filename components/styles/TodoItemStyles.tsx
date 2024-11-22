// components/styles/TodoItemStyles.ts
import { StyleSheet } from 'react-native';

export const todoItemStyles = StyleSheet.create({
  // todoItem: {
  //   flexDirection: 'row',
  //   justifyContent: 'space-between',
  //   alignItems: 'center',
  //   padding: 12,
  //   marginBottom: 8,
  //   borderBottomWidth: 1,
  //   borderColor: '#ccc'
  // },
  // iconButton: {
  //   padding: 10, // Add padding for better touch area
  // },
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#fff',
    marginBottom: 10,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  deleteButton: {
    backgroundColor: '#FF6347',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
    width: 60, // Set the width of the delete button
    borderRadius: 8,
  },
});
