import React, { useState, useEffect } from 'react';
import { TouchableOpacity, Modal, Button } from 'react-native';
import { TextInput, View, Text } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';
import { useTodos } from '@/hooks/useTodos';
import { todoItemStyles as styles } from '@/components/styles/TodoItemStyles';
import { Todo } from '@/components/types/todoTypes';
import { isEditingState } from '@/recoil/atoms';
import { useRecoilState } from 'recoil';

interface TodoItemProps {
  item: Todo;
}

const TodoItem: React.FC<TodoItemProps> = ({ item }) => {
  if (item.deleted) {
    return null;
  }

  const { deleteTodo, updateTodo } = useTodos();
  const [isEditing, setIsEditing] = useRecoilState(isEditingState);
  const [editedTitle, setEditedTitle] = useState(item.title);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = () => {
    setIsEditing(true); // Set isEditing to true
    setModalVisible(true); // Open the modal
  };

  const closeModal = () => {
    setIsEditing(false);
    setModalVisible(false); // Close the modal
  };

  const handleSave = () => {
    if (editedTitle !== item.title) {
      updateTodo(item.id, { title: editedTitle });
    }
    closeModal(); // Close modal after saving
  };

  return (
    <View style={styles.todoItem}>
      <View style={{ flex: 1 }}>
        <Text numberOfLines={1} ellipsizeMode="tail">{item.title}</Text>
      </View>

      <View style={styles.actionButtons}>
        <TouchableOpacity onPress={() => deleteTodo(item.id)} style={styles.iconButton}>
          <Ionicons name="trash-outline" size={24} color="#FF6347" />
        </TouchableOpacity>

        <TouchableOpacity onPress={openModal} style={styles.iconButton}>
          <Ionicons name="create-outline" size={24} color="orange" />
        </TouchableOpacity>
      </View>

      {/* Modal for editing the todo title */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Todo</Text>
            <TextInput
              style={styles.modalInput}
              value={editedTitle}
              onChangeText={setEditedTitle}
              autoFocus
            />
            <View style={styles.modalButtons}>
              <Button title="Cancel" onPress={closeModal} color="#FF6347" />
              <Button title="Save" onPress={handleSave} color="#4CAF50" />
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

export default TodoItem;
