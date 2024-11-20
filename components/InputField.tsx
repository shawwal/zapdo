// components/InputField.tsx
import React, { useState } from 'react';
import { View, TouchableOpacity } from 'react-native';
import { useSetRecoilState } from 'recoil';
import { todosState } from '@/recoil/atoms';
import { inputFieldStyles as styles } from '@/components/styles/InputFieldStyles';
import { ThemedTextInput } from '@/components/ThemedTextInput';
import { Ionicons } from '@expo/vector-icons';

const InputField: React.FC = () => {
  const [inputText, setInputText] = useState('');
  const setTodos = useSetRecoilState(todosState);

  const addTodo = () => {
    if (inputText.trim() === '') return;
    const newTodo = { id: Date.now().toString(), text: inputText.trim() };
    setTodos((todos) => [...todos, newTodo]);
    setInputText('');
  };

  return (
    <View style={styles.inputContainer}>
      <ThemedTextInput
        placeholder="Add a new todo"
        value={inputText}
        onChangeText={setInputText}
        style={styles.input}
      />
      <TouchableOpacity
        onPress={addTodo}
        style={[styles.addButton, inputText.trim() ? styles.enabledButton : styles.disabledButton]}
        disabled={!inputText.trim()}
      >
        <Ionicons
          name="add"
          size={24}
          color={inputText.trim() ? "white" : "#ccc"} // Active vs. disabled color
        />
      </TouchableOpacity>
    </View>
  );
};

export default InputField;
