// components/styles/TodoItemStyles.ts
import { StyleSheet } from 'react-native';

export const todoItemStyles = StyleSheet.create({
  todoItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 10,
    padding: 10,
    borderBottomWidth: 1,
    borderColor: '#eee'
  },
  todoTitleInput: {
    flex: 1,
    fontSize: 16,
    padding: 5,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
  },
  actionButtons: {
    flexDirection: 'row',
    alignItems: 'center',
    marginLeft: 10,
  },
  iconButton: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#eee',
    marginLeft: 10,
  },
});
