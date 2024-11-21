// components/InputField.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity, Alert } from 'react-native';
import { useTodos } from '@/hooks/useTodos'; // Import the useTodos hook
import { inputFieldStyles as styles } from '@/components/styles/InputFieldStyles';
import { TextInput } from '@/components/Themed';
import { Ionicons } from '@expo/vector-icons';

const InputField: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const { addTodo } = useTodos(); // Destructure addTodo from the hook

  const handleAddTodo = () => {
    if (inputText.trim() === '') {
      Alert.alert('Validation Error', 'Todo cannot be empty.');
      return;
    }
    addTodo(inputText.trim()); // Use the hook's addTodo function
    setInputText('');
  };

  return (
    <View style={styles.inputContainer}>
      <TextInput
        placeholder="Add a new todo"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={handleAddTodo}
        style={[
          styles.addButton,
          inputText.trim() ? styles.enabledButton : styles.disabledButton,
        ]}
        disabled={!inputText.trim()}
      >
        <Ionicons
          name="add"
          size={24}
          color={inputText.trim() ? 'white' : '#ccc'} // Active vs. disabled color
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
