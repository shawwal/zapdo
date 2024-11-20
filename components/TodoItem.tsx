// components/TodoItem.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { useSetRecoilState } from 'recoil';
import { todosState } from '@/recoil/atoms';
import { todoItemStyles as styles } from '@/components/styles/TodoItemStyles';
import { Ionicons } from '@expo/vector-icons';

interface Todo {
  id: string;
  text: string;
}

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  const setTodos = useSetRecoilState(todosState);

  const removeTodo = (id: string) => {
    setTodos((todos) => todos.filter((todo) => todo.id !== id));
  };

  return (
    <ThemedView style={styles.todoItem}>
      <ThemedText>{item.text}</ThemedText>
      <TouchableOpacity onPress={() => removeTodo(item.id)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={24} color="#FF6347" />
      </TouchableOpacity>
    </ThemedView>
  );
};

export default TodoItem;
