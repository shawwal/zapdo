import React, { useState } from 'react';
import { TouchableOpacity, TextInput, View, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '@/hooks/useTodos';
import { todoItemStyles as styles } from '@/components/styles/TodoItemStyles';

interface Todo {
  id: string;
  title: string;
  user_id?: string;
  deleted?: boolean;
}

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  // If the item is deleted, return null to render nothing
  if (item.deleted) {
    return null;
  }

  const { deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useState(false);
  const [editedTitle, setEditedTitle] = useState(item.title);

  const handleEdit = () => {
    if (isEditing && editedTitle !== item.title) {
      // Update todo item if title has changed
      updateTodo(item.id, { title: editedTitle });
    }
    setIsEditing(!isEditing); // Toggle edit mode
  };

  return (
    <View style={styles.todoItem}>
      {isEditing ? (
        <TextInput
          style={[styles.todoTitleInput, { flex: 1 }]} // Allow input to fill the container
          value={editedTitle}
          onChangeText={setEditedTitle}
          autoFocus
          onBlur={handleEdit} // When the input loses focus, save the changes
        />
      ) : (
        <View style={{ flex: 1 }}>
          <Text numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
        </View>
      )}

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="#FF6347" />
        </TouchableOpacity>

        <TouchableOpacity onPress={handleEdit} style={styles.iconButton}>
          <Ionicons
            name={isEditing ? "checkmark-outline" : "create-outline"}
            size={24}
            color={isEditing ? "#4CAF50" : "orange"}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default TodoItem;
