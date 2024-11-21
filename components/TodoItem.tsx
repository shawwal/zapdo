// components/TodoItem.tsx
import React from 'react';
import { TouchableOpacity } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { todosState } from '@/recoil/atoms';
import { todoItemStyles as styles } from '@/components/styles/TodoItemStyles';
import { Ionicons } from '@expo/vector-icons';
import { View, Text } from '@/components/Themed';
import { useTodos } from '@/hooks/useTodos';

interface Todo {
  id: string;
  title: string;
  user_id?: string;
  deleted?: boolean; // Add deleted flag to Todo type
}

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {

  // If the item is deleted, return null to render nothing
  if (item.deleted) {
    return null;
  }

  const { deleteTodo } = useTodos();

  return (
    <View style={styles.todoItem}>
      <Text>{item.title}</Text>
      <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.iconButton}>
        <Ionicons name="trash-outline" size={24} color="#FF6347" />
      </TouchableOpacity>
    </View>
  );
};

export default TodoItem;
